/**
 * Created by luthfi on 12/16/16.
 */
import React from 'react'
import { Link } from 'react-router'

export default class SideNavigation extends React.Component {
    constructor() {
        super();
    }

    getClassName(open) {
        if (open)
            return 'bg-white-four aside hidden-print'
        else
            return 'bg-white-four aside hidden-print nav-xs'
    }

    ifNavMobileOpen(open) {
        if (open)
            return 'nav-off-screen';
        else
            return ''
    }

    handleClick() {
        this.props.toggleNavMobile();
    }

    render() {
        return (
            <aside className={this.getClassName(this.props.sideNavOpen)} id="nav">
                <section className="vbox">
                    <section className="w-f-md scrollable">
                        <div className="slim-scroll" data-height="auto" data-disable-fade-out="true" data-distance="0" data-size="10px" data-railOpacity="0.2">
                            <nav className="nav-primary hidden-xs">
                                <ul className="nav bg clearfix">
                                    <li className="hidden-nav-xs padder m-t m-b-sm text-xs text-muted">
                                        Menu
                                    </li>
                                    <li>
                                        <Link to="home" onClick={this.handleClick.bind(this)}>
                                            <i className="icon-home icon" />
                                            <span className="font-bold">Home</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/discover" onClick={this.handleClick.bind(this)}>
                                            <i className="icon-disc icon" />
                                            <span className="font-bold">Discover</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/hits" onClick={this.handleClick.bind(this)}>
                                            <i className="icon-star icon" />
                                            <span className="font-bold">Hits</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/radio" onClick={this.handleClick.bind(this)}>
                                            <i className="icon-microphone icon" />
                                            <span className="font-bold">Radio</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="library" onClick={this.handleClick.bind(this)}>
                                            <i className="icon-playlist icon" />
                                            <span className="font-bold">Library</span>
                                        </Link>
                                    </li>
                                    <li className="m-b hidden-nav-xs" />
                                </ul>
                            </nav>
                        </div>
                    </section>
                </section>
            </aside>
        );
    }
}