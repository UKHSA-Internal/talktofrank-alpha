import React from 'react'

export default class Head extends React.Component {
  render () {
    var title, description

    switch (this.props.error) {
      case 404:
        title = 'Page not found (404)'
        description = 'Page not found (404)'
        break

      case 500:
        title = 'Server error'
        description = 'Server error'
        break

      default:
        title = (this.props.head && this.props.head.title) || this.props.title
        description = (this.props.head && this.props.head.description) || null
        break
    }

    return (
      <head>
        <title>{title + ` | Talk to Frank`}</title>
        <meta charSet='utf-8' />
        <meta content='width=device-width,initial-scale=1.0' name='viewport' />
        <meta content='on' httpEquiv='cleartype' />
        <meta name='format-detection' content='telephone=no' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <link rel='stylesheet' href='/ui/css/critical_min.css' />
        <script dangerouslySetInnerHTML={{__html:
        `  if ('serviceWorker' in navigator) {
          window.addEventListener('load', function() {
          navigator.serviceWorker.register('/service-worker.js');
        })};
        var cb = function() {
        var l = document.createElement('link'); l.rel = 'stylesheet';
        l.href = '/ui/css/app_min.css';
        var h = document.getElementsByTagName('head')[0]; h.parentNode.insertBefore(l, h);
        };
        var raf = requestAnimationFrame || mozRequestAnimationFrame ||
        webkitRequestAnimationFrame || msRequestAnimationFrame;
        if (raf) raf(cb);
        else window.addEventListener('load', cb);`
        }} />
      </head>
    )
  }
}

Head.defaultProps = {
  title: 'Talk to Frank'
}
