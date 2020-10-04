/**
 * AES Encryption and Decryption
 * Using "CryptoJS" library
 * https://code.google.com/archive/p/crypto-js/
 * https://cryptojs.gitbook.io/docs/
 * Eduardo Estrada 10/4/2020
 */
$(document).ready(function () {
    $( "#password-id" ).click(function(){
        $( "#password-id" ).removeClass( "missing" );
    });
    // encrypt
    $("#encrypt-Btn-id").click(function () {
        let sPassword = $("#password-id").val();
        let sPlainText = $("#plainTextArea_id").val();

        if(sPassword === "" || null){
            $('#alert-modal').modal('show');
            $( "#password-id" ).addClass( "missing" );
            $( "#password-id" ).focus();
        } else {
            let encryptedMessage = CryptoJS.AES.encrypt(sPlainText, sPassword);
            $("#cypher-text-id").val(encryptedMessage);
        }
    });
    // decrypt
    $("#decrypt-Btn-id").click(function () {
        let sPassword = $("#password-id").val();
        let sCipherText = $("#cipherTextArea_id").val();
        if(sPassword === "" || null){
            $('#alert-modal').modal('show');
            $( "#password-id" ).addClass( "missing" );
            $( "#password-id" ).focus();
        } else {
            let decryptedBytes = CryptoJS.AES.decrypt(sCipherText, sPassword);
            let sDecryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
            $("#plain-text-id").val(sDecryptedMessage);
        }
    });
});