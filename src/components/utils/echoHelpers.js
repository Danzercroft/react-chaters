import Echo from "laravel-echo";
import axios from "axios";
import store from "../../store";
import { IS_ONLINE, IS_OFFLINE } from "../../actions/types";

export const echoInit = token => {
    window.Pusher = require("pusher-js");
    console.log("echoHelpers: 8");
    console.log(process.env.MIX_PUSHER_APP_KEY);
    window.Echo = new Echo({
        broadcaster: "pusher",
        key: "43fb22802ed86980c2d8",
        cluster: 'ap2',
        //wsHost: "localhost",
        //wsPort: 6001,
	    //wssPort: 6001,
        disableStats: true,
        forceTLS: false,
        authEndpoint: "http://localhost:8000/broadcasting/auth",
    });

    window.Echo.connector.options.auth.headers["Authorization"] =
        "Bearer " + token;
    window.Echo.options.auth = {
        headers: {
            Authorization: "Bearer " + token
        }
    };

    window.Echo.join("chat")
    .here((users) => {
        console.log(" IN HERE INSIDE ECHOHELPERS CHAT");
        console.log(users);
    })
    .joining((user) => {

        const headersObj = {
            headers: {
              'Content-type': 'application/json'
            }
          };

        axios
        .get(`/api/online/${user.id}`, headersObj, {withCredentials:true})
    })
    .leaving((user) => {
        const headersObj = {
            headers: {
              'Content-type': 'application/json'
            }
          };

          console.log("IN LEAVING ");
        axios
        .get(`/api/offline/${user.id}`, headersObj, {withCredentials:true})
    })
    .listen('UserOnline', (event) => {
        console.log(event.user.name+" IS ONLINE ");
        console.log(event.user);
        store.dispatch({ type: IS_ONLINE, payload: event.user.id});
    }) 
    .listen('UserOffline', (event) => {
        console.log(event.user.name+" IS OFFLINE ");
        console.log(event.user);
        store.dispatch({ type: IS_OFFLINE, payload: event.user.id});
    });
};

export const sendMessage = ( message, channel_id, channel_type) => {
    const body = JSON.stringify({ message, channel_id, channel_type });

    const postHeaders = {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("LRC_Token"),
            "Content-Type": "application/json"
        }
    };
    axios
        .post("/api/messages", body, postHeaders)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            const errors = err.response.data.errors;
            console.log(errors);
            Object.values(errors).map(error => {
                console.log(error.toString());
            });
        });
};

export const getAvatar = (value) => {
    let details = value.details;
    if(!details) {
      return 'avatars/defaultuser.png';
    } else {
      return details.avatar;
    }
  };