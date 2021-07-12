import React from 'react';
import debounce from '../../helper';
import './style.css';
import SidebarItemComponent from '../sidebaritem/sidebarItem';
import FakeSidebarItemComponent from '../sidebaritem/fakebarItem'

class SidebarComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: [{ text: '', id: '' }],
      selectedNoteIndex: -1,
      selectedNote: null,
      search: '',
      isSearching: false,
    }
  }

  componentDidMount = () => {
    this.setState({
      notes: this.props.notes,
      selectedNoteIndex: this.props.selectedNoteIndex,
      selectedNote: this.props.selectedNote,
      isSearching: this.props.isSearching,
      search: this.props.search
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      notes: nextProps.notes,
      selectedNoteIndex: nextProps.selectedNoteIndex,
      selectedNote: nextProps.selectedNote,
      isSearching: nextProps.isSearching,
      search: nextProps.search
    })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      notes: nextProps.notes,
      selectedNoteIndex: nextProps.selectedNoteIndex,
      selectedNote: nextProps.selectedNote,
      isSearching: nextProps.isSearching,
      search: nextProps.search
    })
  }

  componentDidUpdate = () => {
    if (this.state.selectedNoteIndex != this.props.selectedNoteIndex || this.state.search != this.props.search) {
      this.setState({
        notes: this.props.notes,
        selectedNoteIndex: this.props.selectedNoteIndex,
        selectedNote: this.props.selectedNote,
        isSearching: this.props.isSearching,
        search: this.props.search,
      })
    }
  }


  render() {
    if (this.state.isSearching === true) {
      return (
        <div className='flex-container'>
          {
            this.state.notes.map(item => {
              if (item.title.includes(this.state.search) || item.text.includes(this.state.search)) {
                return (
                  <SidebarItemComponent
                    selectedNoteIndex={this.state.selectedNoteIndex}
                    selectedNote={this.state.selectedNote}
                    currentNoteTitle={item.title}
                    currentNote={item.text}
                    currentNoteId={typeof (item.id) == 'String' ? item.id.toString() : item.id}
                    currentNoteTime={item.date + '  ' + item.time}
                    selectNote={(n, i) => this.props.selectNote(n, i)}
                  />
                )
              }
              else {
              }
            })
          }
        </div>
      )
    }

    if (this.state.notes.length === 0) {
      return (
        <div className='flex-container'>
          <FakeSidebarItemComponent></FakeSidebarItemComponent>
        </div>

      )
    }
    else {
      return (
        <div className='flex-container'>
          {this.state.notes.map(item =>
            <SidebarItemComponent
              id={item.id}
              selectedNoteIndex={this.state.selectedNoteIndex}
              selectedNote={this.state.selectedNote}
              currentNoteTitle={item.title}
              currentNote={item.text}
              currentNoteId={typeof (item.id) == String ? item.idtoString() : item.id}
              currentNoteTime={item.date + '  ' + item.time}
              selectNote={(n, i) => this.props.selectNote(n, i)}
            />)}
        </div>
      )
    }

  }
}

export default SidebarComponent;
