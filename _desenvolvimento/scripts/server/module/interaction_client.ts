"use strict";

class MainController {

    constructor(searchService) {
        //this.searchService = searchService;
    }

   
}
export { MainController }


// let buttons, $rootScope: any;
// $('.btnInteraction').click(function(e){ 
//     buttons = $(this);
//     let valor   = $(this).attr('data-myval');
//     let fields  = valor.split(',');
    
//     let tipos   = fields[0];
//     let user_to = fields[1];
//     let user_from = fields[2];
//     let notificationNumber = fields[3];                        
    
//     let preventButton = function(tipos, user_to, user_from, notificationNumber){
//         setTimeout(function(){
//             client.emit(tipos, {user_to: user_to, user_from: user_from, typeNotification: notificationNumber}, function(message1, eventName){
//                 buttons.prop('disabled', false);
//             });                                
//         }, 1000);
            
//     };

//     switch (tipos) {
//         case 'curtir':                                
//             buttons.prop('disabled', true);
//             preventButton(tipos, user_to, user_from, notificationNumber);
//             break;
//         case 'seguir':
//             buttons.prop('disabled', true);
//             preventButton(tipos, user_to, user_from, notificationNumber);
//             break;
//         case 'indicar':
//             //buttons.prop('disabled', true);
//             $rootScope.mesagens_usuario('indicacao', 'alert', user_to, user_from);
//             //preventButton(tipos, user_to, user_from, notificationNumber);
//             break;
//         case 'solicitacaoAmizade':
//             buttons.prop('disabled', true);
//             preventButton(tipos, user_to, user_from, notificationNumber);
//             break;
//         case 'desfazerAmizade':
//             $rootScope.mesagens_usuario('desfazer', 'alert', user_to, user_from);
//             break;
//         case 'ouvirRadio':
//             buttons.prop('disabled', true);
//             preventButton(tipos, user_to, user_from, notificationNumber);
//             break;
//         default:
//             break;
//     };                                
//     e.preventDefault();
// }); 
