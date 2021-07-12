import React from 'react';
import debounce from '../../helper';
import './style.css';

class FakeEditorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'select/create a note to start',
      text: 'select/create a note to start',
    };
    this.updateBody = this.updateBody.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
  }

  componentDidMount = () => {
    this.setState({
    
    })
  }

  componentDidUpdate = () => {

    if (this.props.selectedNoteIndex !== this.state.id) {
      this.setState({
      
      });
    }
  }
  componentWillReceiveProps = (nextProps) => {

    this.setState(
      {
     
      }
    )
  }

  updateBody = async (val) => {
    await this.setState({ 
      text: val.target.value, 
      // time: Date().toString().slice(4, Date().toString().indexOf('GM') - 1), 
    });

  };

  updateTitle = async (val) => {
    await this.setState({ 
      title: val.target.value, 
      // time: Date().toString().slice(4, Date().toString().indexOf('GM') - 1), 
    });

  };

  // update = debounce(() => {
  //   this.props.noteUpdate(
  //     this.state.id,
  //     { title: this.state.title, body: this.state.text, id: this.state.id, time: this.state.time }
  //   )
  //   console.log("update")
  // }
  //   , 500);

  onChange(e){
    this.setState({search: e.target.value});
  }

  render() {
    return (
      <div className='editor-container'>
        <input className="editor-title"
          value={this.state.title}
          // onChange={this.updateTitle}
          ></input>
        {/* <p className = "editor-time">{this.props.selectedNote.time}</p> */}
        <p className = "editor-time">{this.state.time}</p>
        <textarea className="editor-body"
         value={this.state.text}
        //  onChange={this.updateBody}
          >
        </textarea>
      </div>
    )
  }
}

export default FakeEditorComponent;
