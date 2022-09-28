import firestore from '@react-native-firebase/firestore';

const searchTokenById =  (searchId) => {
    const member = firestore().collection('member');

    member.where('id', '==', searchId).get()
        .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                console.log(documentSnapshot)
                const token = documentSnapshot.data().fcmtoken ?? '';
                console.log(token)
                return (token)
            }
            );
        })
        .catch(error => alert(error))
};

const sendSingleDeviceNotification = (data, id) => {
    var myHeaders = new Headers();
    var token = searchTokenById(id)
    //console.log(token)

    myHeaders.append("Authorization", "key=AAAAU8z9fPg:APA91bEz1F4MeMqld7I6nd6L-p6MieaRoCgs3TdqGuRWC0xbimWbDNDqw07K70bSssBQmd-Eq8x_EBkQVSy83L8rplud30F4JbXqzB6O2eoG3L-7M-HD5ZX3asYSLXCqcB5k34y5dSDE");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "data": {},
        "notification": {
            "body": `부족한 재료 ${data}`,
            "title": "재료 요청"
        },
        "to": "d47FW9FAQ3y9cpyXVqx4lS:APA91bFKZzTfXrybwEzg0cth3RNpEI6y8rox9fuONtNISb0HkNAN6oZCw7hZMGd0xib2GDn9vvs633MPiQ_4NOIf_CXmKat5yLBM6gbA4Pbl9bAq8qs5K8rHSvAT07sJSWLjG8GsMIW6"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://fcm.googleapis.com/fcm/send", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
};

export default {
    sendSingleDeviceNotification
};