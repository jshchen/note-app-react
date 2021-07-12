import React from 'react';
import debounce from '../../helper';
import './style.css';

class EditorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      id: '',
      time: ' ',
    };
    this.updateBody = this.updateBody.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
  }

  componentDidMount = () => {
    this.setState({
      title: this.props.selectedNote.title,
      text: this.props.selectedNote.text,
      id: this.props.selectedNoteIndex,
      time: this.props.selectedNote.date + '  '+ this.props.selectedNote.time
    })
  }

  componentDidUpdate = () => {

    if (this.props.selectedNoteIndex !== this.state.id) {
      this.setState({
        title: this.props.selectedNote.title,
        text: this.props.selectedNote.text,
        id: this.props.selectedNoteIndex,
        time: this.props.selectedNote.date + '  '+ this.props.selectedNote.time
      });
    }
  }
  componentWillReceiveProps = (nextProps) => {

    this.setState(
      {
        title: nextProps.selectedNote.title,
        text: nextProps.selectedNote.text,
        id: nextProps.selectedNoteIndex,
        time: nextProps.selectedNote.date + '  '+ nextProps.selectedNote.time
      }
    )
  }

  updateBody = async (val) => {
    await this.setState({ 
      text: val.target.value, 
      // time: Date().toString().slice(4, Date().toString().indexOf('GM') - 1), 
    });
    this.update();
  };

  updateTitle = async (val) => {
    await this.setState({ 
      title: val.target.value, 
      // time: Date().toString().slice(4, Date().toString().indexOf('GM') - 1), 
    });
    this.update();
  };

  update = debounce(() => {
    this.props.noteUpdate(
      this.state.id,
      { title: this.state.title, text: this.state.text, id: this.state.id, time: this.state.time }
    )
    console.log("update")
  }
    , 500);

  onChange(e){
    this.setState({search: e.target.value});
  }

  render() {
    return (
      <div className='editor-container'>
        <input className="editor-title"
          value={this.state.title}
          onChange={this.updateTitle}
          ></input>
        {/* <p className = "editor-time">{this.props.selectedNote.time}</p> */}
        <p className = "editor-time">{this.state.time}</p>
        <textarea className="editor-body"
          value={this.state.text}
          onChange={this.updateBody}
          >
        </textarea>
      </div>
    )
  }
}

export default EditorComponent;
