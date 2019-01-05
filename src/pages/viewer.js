import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

export default class Viewer extends React.Component {
  state = {
    content: {},
    filtered: {},
  }

  handleUpload = async () => {
    const data = this.uploader.current.files[0]
    console.log(data)
    var reader = new FileReader()
    reader.onload = await function(e) {
      let text = reader.result
      this.setState({
        content: JSON.parse(text),
        filtered: JSON.parse(text),
      })
    }
    reader.readAsText(data)
  }

  toggleCheck = e => {
    const index = e.currentTarget.name
    const val = e.currentTarget.checked
    const content = this.state.content
    content.friends[index].checked = val
    this.setState({ content })
    this.setState({
      filtered: content,
    })
  }

  filter = e => {
    if (e.currentTarget.value === 'checked') {
      let filtered = this.state.filtered
      filtered = filtered.friends.filter(
        friend => friend.checked !== undefined && friend.checked === true
      )
      this.setState({ filtered })
    } else if (e.currentTarget.value === 'unchecked') {
      let filtered = this.state.content
      filtered = filtered.friends.filter(
        friends => friends.checked === undefined || friends.checked === false
      )
      this.setState({ filtered })
    } else {
      let filtered = this.state.content
      this.setState({ filtered })
    }
  }

  download = (filename, text) => {
    var element = document.createElement('a')
    element.setAttribute(
      'href',
      'data:application/json;charset=utf-8,' + encodeURIComponent(text)
    )
    element.setAttribute('download', filename)

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
  }

  save = () => {
    if (
      Object.keys(this.state.content).length !== 0 &&
      this.state.content.constructor === Object
    ) {
      this.download('friends.json', JSON.stringify(this.state.content))
    } else {
      alert('Cannot save uploaded content if it does not exist!')
    }
  }

  saveImportant = () => {
    let filtered = this.state.filtered.friends.filter(
      friend => friend.checked !== undefined && friend.checked === true
    )
    if (Object.keys(filtered).length !== 0 && filtered.constructor === Object) {
      this.download('friends-important.json', JSON.stringify(filtered))
    } else {
      alert('You have not marked any friends as important')
    }
  }

  render() {
    return (
      <Layout>
        <SEO title="Viewer" />
        <p>
          <i>Preferred file is friends.json</i>
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <form>
            <input
              type="file"
              accept="application/json"
              ref={this.uploader}
              onChange={this.handleUpload}
            />
            <select onChange={this.filter}>
              <option value="All">All</option>
              <option value="checked">Checked</option>
              <option value="Unchecked">Unchecked</option>
            </select>
          </form>
          <button
            onClick={this.save}
            style={{ height: '30px', width: '7vmin' }}
          >
            Save
          </button>
          <button
            onClick={this.saveImportant}
            style={{ height: '30px', width: '20vmin' }}
          >
            Save Important
          </button>
        </div>
        {Object.keys(this.state.filtered).length !== 0 &&
          this.state.filtered.constructor === Object && (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Important</th>
                </tr>
              </thead>
              <tbody>
                {this.state.filtered.friends.map((friend, index) => {
                  if (
                    friend.checked === undefined ||
                    friend.checked === false
                  ) {
                    return (
                      <tr key={friend.timestamp + friend.name}>
                        <th>{friend.name}</th>
                        <th>
                          <form>
                            <input
                              type="checkbox"
                              name={index}
                              value={false}
                              onChange={this.toggleCheck}
                            />
                          </form>
                        </th>
                      </tr>
                    )
                  } else {
                    return (
                      <tr key={friend.timestamp + friend.name}>
                        <th>{friend.name}</th>
                        <th>
                          <form>
                            <input
                              type="checkbox"
                              name={index}
                              value={true}
                              checked
                            />
                          </form>
                        </th>
                      </tr>
                    )
                  }
                })}
              </tbody>
            </table>
          )}
        <Link to="/">Go back to the homepage</Link>
      </Layout>
    )
  }
}
