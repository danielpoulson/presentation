import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/page1.css"

const totalItems = 5

class IndexPage extends React.Component {
  state = {
    items: ["active", "next", "", "", "prev"],
    moving: false,
    slide: 1,
  }

  componentWillMount() {
    window.addEventListener("keydown", this.enterToSearch)
  }

  componentWillUnmount() {
    window.removeEventListner("keydown", this.enterToSearch)
  }

  enterToSearch = event => {
    if (event.keyCode === 37) {
      this.movePrev()
    }
    if (event.keyCode === 39 || event.keyCode === 13) {
      this.moveNext()
    }
  }

  moveNext() {
    let moveTo = this.state.slide
    // Check if moving
    if (!this.state.moving) {
      // If it's the last slide, reset to 0, else +1
      if (this.state.slide === totalItems) {
        moveTo = 1
      } else {
        moveTo = this.state.slide + 1
      }
      // Move carousel to updated slide
      this.setState({ slide: moveTo })
      this.moveCarouselTo(moveTo)
    }
  }

  movePrev() {
    let moveTo = this.state.slide
    const moving = this.state.moving
    // Check if moving
    if (!moving) {
      // If it's the last slide, reset to 0, else +1
      if (this.state.slide === 1) {
        moveTo = totalItems
      } else {
        moveTo = this.state.slide - 1
      }
      // Move carousel to updated slide
      this.setState({ slide: moveTo })
      this.moveCarouselTo(moveTo)
    }
  }

  disableInteraction() {
    // Set 'moving' to true for the same duration as our transition.
    // (0.5s = 500ms)

    this.setState({ moving: true })
    // setTimeout runs its function once after the given time
    setTimeout(() => {
      this.setState({ moving: false })
    }, 500)
  }

  moveCarouselTo(moveTo) {
    // Check if carousel is moving, if not, allow interaction
    if (!this.state.moving) {
      // temporarily disable interactivity
      this.disableInteraction()
      // Update the "old" adjacent slides with "new" ones
      const prev = moveTo === 1 ? 5 : moveTo - 1
      const next = moveTo === totalItems ? 1 : moveTo + 1

      const returned = this.state.items.map((item, index) => {
        let _item = ""
        switch (index + 1) {
          case moveTo:
            _item = "active"
            break
          case prev:
            _item = "prev"
            break
          case next:
            _item = "next"
            break

          default:
            _item = ""
            break
        }

        return _item
      })

      this.setState({ items: returned })
    }
  }
  render() {
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <h1>Magic Slider</h1>
        <div className="carousel-wrapper">
          <div className="carousel">
            <div className={`carousel__div ${this.state.items[0]}`}>
              Image 1
            </div>
            <div className={`carousel__div ${this.state.items[1]}`}>
              Image 2
            </div>
            <div className={`carousel__div ${this.state.items[2]}`}>
              Image 3
            </div>
            <div className={`carousel__div ${this.state.items[3]}`}>
              Image 4
            </div>
            <div className={`carousel__div ${this.state.items[4]}`}>
              Image 5
            </div>

            <div
              className="carousel__button--next"
              onClick={() => this.moveNext()}
            />
            <div
              className="carousel__button--prev"
              onClick={() => this.movePrev()}
            />
          </div>
        </div>
      </Layout>
    )
  }
}

export default IndexPage
