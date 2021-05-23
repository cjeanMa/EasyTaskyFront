import React from 'react'

const Test = () => {

    const [state, setState] = React.useState("");

    const handleChange = (event) => {
        setState(event.target.value);
        console.log(state);
      }
    
    const handleSubmit = (event) => {
        alert('A name was submitted: ' + state);
        event.preventDefault();
      }

    return (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={state} onChange={handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      )
}

export default Test
