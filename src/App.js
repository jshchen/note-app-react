import React, { Component } from 'react';
import EditorComponent from './component/editor/editor';
import SidebarComponent from './component/sidebar/sidebar';
import Navbar from './component/navbar/navbar';
import './App.css';
import axios from 'axios';
import FakeEditorComponent from './component/editor/fakeeditor';
// let localconnection = "http://localhost:3306/";
// let EC2connection = "http://54.208.37.184:3001/";
let EC2connection = "http://localhost:3001/"

class App extends React.Component {
  

  constructor() {
    super();
    this.state = {
      selectedNoteIndex: '0',
      selectedNote: null,
      notes: [{ title: 'Loading', text: 'Loading', date: ' ', time: ' ' , id: 0 }],
      // notes: initialnote,
      isSearching: false,
      search: '',
      findresult: true,
      expand: true,
    };
  }

  componentWillMount() {
    axios.get(EC2connection)
      .then(response => {
        console.log("sdfdsfdsfdsf")
        this.setState({
          notes: JSON.parse(response.request.response),
        })
        // console.log("componentWillMount: " + this.state.notes);
      })
      .catch(error => {
        console.log(error);
      })
  }
  componentDidMount() {
    axios.get(EC2connection)
      .then(response => {
        this.setState({
          notes: JSON.parse(response.request.response),
        })
        // console.log("componentWillMount: " + this.state.notes);
      })
      .catch(error => {
        console.log(error);
      })
  }


  selectNote = (note, index) => {
    this.setState({
      selectedNoteIndex: index,
      selectedNote: note,
    })
  }

  noteUpdate = (id, text) => {
    let tempnotes = this.state.notes;
    tempnotes[id] = text;
    let daytime = new Date().getTime();
    axios.put(EC2connection+'updateNote?id=' + id + '&daytime='+ daytime + '&text='+ tempnotes[id].text + '&title='+ tempnotes[id].title)
    .then(response => {
      console.log('noteUpdate----------1');
      this.setState({
        notes: JSON.parse(response.request.response),
      })
    })
    // this.setState({
    //   notes: tempnotes
    // })
    console.log('noteUpdate----------2');
    // console.log(tempnotes)
  }





  newNote = () => {
    let tempnotes = this.state.notes;
    
    let time = new Date();
    let newtime = time.toString();
    let daytime = new Date().getTime();
    console.log(daytime)
    newtime = newtime.slice(4, newtime.indexOf('GM') - 1)
    axios.put(EC2connection+'create?daytime=' + daytime + '&title=New Note Title' + '&text=New Note')
      .then(response => {
        console.log("-----------1-------------");
        console.log(this.state.selectedNoteIndex);
        console.log(this.daytime);
        console.log("response.request.response[0]:  " + response.request.response);
        this.setState({
          notes: JSON.parse(response.request.response),
          selectedNoteIndex: 0,
          selectedNote: 'New Note',
        })
        console.log('-----------2--------------');
        console.log(this.state.selectedNoteIndex);
      })
      .catch(error => console.log(error))

  }

  newNotewithTitle = (title) => {
    // let tempnotes = this.state.notes;
    // let tempid = this.state.notes.length.toString()
    // tempnotes.push({ title: title, text: 'New Note', id: tempid, time: Date().toString().slice(4, Date().toString().indexOf('GM') - 1) });
    // this.setState({
    //   notes: tempnotes,
    //   selectedNoteIndex: tempid,
    //   selectedNote: 'New Note',
    // })
    let daytime = new Date().getTime();
    axios.put(EC2connection+'create?daytime=' + daytime + '&title=' + title  + '&text=New Note')
    .then(response => {
      console.log("-----------1-------------");
      console.log(this.state.selectedNoteIndex);
      console.log(this.daytime);
      console.log("response.request.response[0]:  " + response.request.response);
      this.setState({
        notes: JSON.parse(response.request.response),
        selectedNoteIndex: 0,
        selectedNote: 'New Note',
      })
      console.log('-----------2--------------');
      console.log(this.state.selectedNoteIndex);
    })
    .catch(error => console.log(error))
  }

  deleteNote = () => {
    // let tempnotes = this.state.notes;
    let tempid = this.state.selectedNoteIndex;
    // tempnotes.splice(tempid, tempid);
    // delete tempnotes[tempid]
    axios.delete(EC2connection+'delete?id='+tempid)
    .then(response => {
      this.setState({
        notes: JSON.parse(response.request.response),
        selectedNoteIndex: '0',
      })
    })
  }

  searchNote = (search) => {
    if (search != '') {
      this.setState({
        search: search,
        isSearching: true
      })
    }
    else {
      this.setState({
        search: search,
        isSearching: false
      })
    }
    if (this.searchforresult(this.state.searchNote) === false) {
      this.setState({
        findresult: false
      })
    }
    else {
      this.setState({
        findresult: true
      })
    }
  }

  searchforresult = (search) => {
    for (var i = 0; i < this.state.notes.length; i++) {
      if (this.state.notes[i] != null) {
        if (this.state.notes[i].title.includes(this.state.search) || this.state.notes[i].text.includes(this.state.search)) {
          return true
        }
      }
    }
    return false
  }

  expandFunc = () => {
    this.setState({
      expand: !this.state.expand
    })
    console.log("ccc")
  }

  render() {
    function search(nameid, myArray) {
      for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].id === nameid) {
          return myArray[i];
        }
      }
    }
    

    return (

      <div className="app-container">
        <Navbar
          selectedNoteIndex={this.state.selectedNoteIndex}
          selectedNote={this.state.selectedNote}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          newNote={this.newNote}
          newNotewithTitle={this.newNotewithTitle}
          searchNote={this.searchNote}
          findresult={this.state.findresult}
          expand={this.state.expand}
          expandFunc={this.expandFunc}
        ></Navbar>
        <div className="two-container">
          {
            this.state.expand ?
              <SidebarComponent
                selectedNoteIndex={this.state.selectedNoteIndex}
                selectedNote={this.state.selectedNote}
                notes={this.state.notes}
                selectNote={this.selectNote}
                search={this.state.search}
                isSearching={this.state.isSearching}
                findresult={this.state.findresult}
              >
              </SidebarComponent> : <div></div>
          }
          { this.state.notes.length === 0 ?
            <FakeEditorComponent>
            </FakeEditorComponent>:
            this.state.selectedNoteIndex == '0' ?
              // <EditorComponent
              //   selectedNoteIndex={this.state.selectedNoteIndex}
              //   selectedNote={this.state.notes[0]}
              //   noteUpdate={this.noteUpdate}
              // /> 
              <FakeEditorComponent>
            </FakeEditorComponent>
              :
              <EditorComponent
                selectedNoteIndex={this.state.selectedNoteIndex}
                // selectedNote={this.state.notes[this.state.selectedNoteIndex-1]}
                selectedNote = {
                  this.state.notes.find(x => x.id === this.state.selectedNoteIndex)
                }
                noteUpdate={this.noteUpdate}
              />
          }
        </div>
      </div>

    )
  }
}

export default App;
