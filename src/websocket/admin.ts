import { Socket } from 'socket.io';
import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionService';
import { MessagesService } from '../services/MessageService';

io.on("connect", async (socket: Socket) => {
  const connectionsService = new ConnectionsService();
  const messagesService = new MessagesService();

  const allConnectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin();

  io.emit("admin_list_all_users", allConnectionsWithoutAdmin);

  socket.on("admin_list_messages_by_user", async (params, callback) => {
    const { user_id } = params;
  
    const allMessages = await messagesService.listByUser(user_id);

    callback(allMessages);
  });

  socket.on("admin_send_message", async (params) => {
    const { user_id, text } = params;

    await messagesService.create({
      text,
      user_id,
      admin_id: socket.id,
    });

    const { socket_id } = await connectionsService.findByUserId(user_id);

    io.to(socket_id).emit("admin_send_to_client", {
      text: text,
      socket_id: socket.id
    })
  });

  // socket.on("admin_user_in_support", async (params) => {
  //   const { user_id } = params;
  //   await connectionsService.updateAdminId(user_id, socket.id);

  //   const allConnectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin();

  //   io.emit("admin_list_all_users", allConnectionsWithoutAdmin); //Reset when user enter in attendance again
  // })
});