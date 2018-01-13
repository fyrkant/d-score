import * as React from 'react'

import { Highscore } from './Highscore'
import { Television } from './Television'

export class App extends React.Component {
  public render() {
    return (
      <React.Fragment>
      <Television />
      <div className="outer">
        <div>
          <Highscore />
        </div>
      </div>
      </React.Fragment>
    )
  }
}
