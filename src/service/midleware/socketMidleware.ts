import { wsActions as wsActionsType } from '../actions/constant';
import { rootStoreType } from '../../index';
export const socketMiddleware : (wsUrl : string, wsActions: typeof wsActionsType) => any = (wsUrl : string, wsActions: typeof wsActionsType) => {
    return (store: rootStoreType) => {
      let socket : any = null;
  
      return (next : any) => (action: {type:string; payload: object | string}) => {
        const { dispatch } = store;
        const { type, payload } = action;
        const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
        if (type === wsInit) {
          socket = new WebSocket((typeof payload === 'string' && payload) || wsUrl);
        }
        if (socket) {
          socket.onopen = (event: Event) => {
            dispatch({ type: onOpen, payload: event });
          };
  
          socket.onerror = (event: ErrorEvent) => {
            dispatch({ type: onError, payload: event });
          };
  
          socket.onmessage = (event: MessageEvent) => {
            const { data } = event;
            const parsedData = JSON.parse(data);
  
            dispatch({ type: onMessage, payload: parsedData });
          };
  
          socket.onclose = (event: CloseEvent) => {
            console.log('close')
            dispatch({ type: onClose, payload: event });
          };

          if(type === onClose){
            socket.close()
          }
  
          if (type === wsSendMessage) {
            socket.send(JSON.stringify(payload));
          }
        }
  
        next(action);
      };
    };
  };