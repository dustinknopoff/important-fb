import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

export default class Viewer extends React.Component {
  constructor(props) {
    super(props)
    this.state = { content: {}, filtered: {} }
    this.handleUpload = this.handleUpload.bind(this)
    this.toggleCheck = this.toggleCheck.bind(this)
    this.saveImportant = this.saveImportant.bind(this)
    this.save = this.save.bind(this)
    this.download = this.download.bind(this)
    this.filter = this.filter.bind(this)
    this.uploader = React.createRef()
  }

  async handleUpload() {
    const data = this.uploader.current.files[0]
    console.log(data)
    let _this = this
    var reader = new FileReader()
    reader.onload = await function(e) {
      let text = reader.result
      _this.setState({
        content: JSON.parse(text),
        filtered: JSON.parse(text),
      })
    }
    reader.readAsText(data)
  }

  toggleCheck(e) {
    const index = e.currentTarget.name
    const val = e.currentTarget.checked
    const content = this.state.content
    content.friends[index].checked = val
    this.setState({ content })
    this.setState({
      filtered: content,
    })
  }

  filter(e) {
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

  download(filename, text) {
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

  save() {
    if (
      Object.keys(this.state.content).length !== 0 &&
      this.state.content.constructor === Object
    ) {
      this.download('friends.json', JSON.stringify(this.state.content))
    } else {
      alert('Cannot save uploaded content if it does not exist!')
    }
  }

  saveImportant() {
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
    let _this = this
    return (
      <Layout>
        <SEO title="Viewer" />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <p>
            <i>Preferred file is friends.json</i>
          </p>
          <form>
            <input
              type="file"
              accept="application/json"
              ref={_this.uploader}
              onChange={_this.handleUpload}
            />
            <select onChange={_this.filter}>
              <option value="All">All</option>
              <option value="checked">Checked</option>
              <option value="Unchecked">Unchecked</option>
            </select>
          </form>
          <button onClick={_this.save} style={{ height: '30px' }}>
            Save
          </button>
          <button onClick={_this.saveImportant} style={{ height: '30px' }}>
            Save Important
          </button>
        </div>
        {Object.keys(_this.state.filtered).length !== 0 &&
          _this.state.filtered.constructor === Object && (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Important</th>
                </tr>
              </thead>
              <tbody>
                {_this.state.filtered.friends.map((friend, index) => {
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
