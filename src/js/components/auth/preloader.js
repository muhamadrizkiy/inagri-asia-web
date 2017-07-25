/**
 * Created by luthfi on 18/04/17.
 */
import React from 'react'

export default class Preloader extends React.Component {
    render() {
        return (
            <section className="m-b-lg">
                <span className="musicbar animate inline m-l-sm" style={{width: '120px', height: '100px', marginLeft: '105px', marginTop: '40px'}}>
                    <span className="bar1 a1 bg-primary lter" />
                    <span className="bar2 a2 bg-info lt" />
                    <span className="bar3 a1 bg-primary lter" />
                    <span className="bar4 a2 bg-info lt" />
                    <span className="bar5 a1 bg-primary lter" />
                </span>
                <div style={{textAlign: 'center'}}>
                    Please enjoy a moment...
                </div>
            </section>
        )
    }
}