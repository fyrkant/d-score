import Link from 'next/link'
import * as React from 'react'

import { differenceInCalendarDays } from 'date-fns'
import { Fragment } from 'react'

interface Score {
  nick: string
  start: Date
  days?: number
  end?: Date
}

const data: Score[] = [
  {
    nick: 'vol714',
    start: new Date(1983, 8, 20),
    end: new Date(2014, 8, 12),
  },
  {
    nick: 'fyrkant',
    start: new Date(1987, 3, 31),
  },
]

// var makeNoise = function() {
//   var imgd = context.createImageData(canvas.width, canvas.height);
//   var pix = imgd.data;

//   for (var i = 0, n = pix.length; i < n; i += 4) {
//       var c = 7 + Math.sin(i / 50000 + time / 7) // A sine wave of the form sin(ax + bt)
//       pix[i] = pix[i + 1] = pix[i + 2] = 40 * Math.random() * c // Set a random gray
//       pix[i + 3] = 255 // 100% opaque
//   }

//   context.putImageData(imgd, 0, 0)
//   time = (time + 1) % canvas.height
// }

// const setup = function() {
//   canvas = document.getElementById('tv')
//   context = canvas.getContext('2d')
// }

// setup()
// intervalId = setInterval(makeNoise, 50)

class TV extends React.Component {
  public canvas: HTMLCanvasElement | null
  public context: CanvasRenderingContext2D | null
  public time: number = 0

  public componentDidMount() {
    if (this.canvas) {
      this.context = this.canvas.getContext('2d')
      setInterval(() => this.makeNoise(), 50)
    }
  }

  public makeNoise() { // thank u https://stackoverflow.com/a/23572465
    if (this.context && this.canvas) {
      this.canvas.setAttribute('width', (document.body.offsetWidth / 4).toString())
      this.canvas.setAttribute('height', (document.body.offsetHeight / 4).toString())
      const imgd = this.context.createImageData(this.canvas.width, this.canvas.height)
      const pix = imgd.data

      for (let i = 0, n = pix.length; i < n; i += 4) {
        const c = 7 + Math.sin(i / 50000 + this.time / 7) // A sine wave of the form sin(ax + bt)
        pix[i] = pix[i + 1] = pix[i + 2] = 2 * Math.random() * c // Set a random gray
        pix[i + 3] = 255 // 100% opaque
    }

      this.context.putImageData(imgd, 0, 0)
      this.time = (this.time + 1) % this.canvas.height
    }
  }
  public render() {
    return (
      <canvas ref={canvas => this.canvas = canvas}></canvas>
    )
  }
}

const scoreLine = (s: Score) => <li key={ s.nick }>{ s.nick }: { s.days }</li>

export default class Index extends React.Component {
  public ol: HTMLOListElement | null
  public componentDidMount() {
    if (!document.documentElement.classList.contains('wf-active')) {
      import('webfontloader').then(WebFont =>
        WebFont.load({
          google: {
            families: ['VT323'],
          },
          active: () => {
            if (this.ol) {
              this.ol.classList.add('active')
            }
          },
        }),
      )
    }
  }
  public render() {
    return (
      <Fragment>
      <TV />
      <div className="outer">
        <div>
          <ol ref={ol => this.ol = ol}>
            {
              data
                .map(s => ({...s, days: differenceInCalendarDays(s.end || new Date(), s.start)}))
                .sort((a, b) => b.days - a.days)
                .map(scoreLine)
            }
          </ol>
        </div>
        <style jsx>{`
          body, html {
            height: 100%;
            padding: 0;
            margin: 0;
          }
          body {
            background-color: black;
          }
          canvas {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
          }
          div.outer {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
          }
          ol {
            flex: 1;
            opacity: 0;
          }
          ol.active {
            opacity: .8;
            transition: 0.7s ease-in;
          }
          li {
            opacity: .8;
            font-size: 3em;
            font-family: VT323;
            color: white;
          }
        `}</style>
      </div>
      </Fragment>
    )
  }
}
