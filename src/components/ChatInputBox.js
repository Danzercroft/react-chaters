import { lowerCase } from 'lodash';
import React, { Component } from 'react'
import {
    Button,
    Row,
    Input,
    InputGroup
  } from 'reactstrap';
import { sendMessage } from './utils/echoHelpers';

  
export class ChatInputBox extends Component {

    state = {
        message:""
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        setTimeout( () => {
          window.Echo.join(`chat.${this.props.selectedChannel.type}.${this.props.selectedChannel.id}`)
          .whisper("typing", {
            name: this.props.currUser
          });
        }, 300)

      };

      // Calls action to register user
      sendMessageWrapper = (e) => {
        e.stopPropagation();
        console.log(this.state.message);
        sendMessage(this.state.message, this.props.selectedChannel.id, this.props.selectedChannel.type)
        this.setState({ message:'' });

      }

    render() {
        return (
           <Row className="chatInput">
              <InputGroup  >
                <Input autoComplete="off" onChange={this.onChange} id="message" value={this.state.message}name="message" />
                  <Button color="primary"  onClick={this.sendMessageWrapper} style={{fontSize:'1.3rem', textTransform:'lowercase'}}> <i className="far fa-paper-plane"></i> send </Button>
                </InputGroup> 
                </Row>
        )
    }
}

export default ChatInputBox