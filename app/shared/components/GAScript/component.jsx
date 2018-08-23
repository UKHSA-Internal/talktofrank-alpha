import React from 'react'

export default class GAStript extends React.Component {
  createMarkup (script) {
    return {
      __html: script
    }
  }

  render () {
    const script = `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      ga('create', '${this.props.trackingId}', 'auto');
      ga('set', 'dimension1', 'online');
      ga('send', 'pageview');`

    return <script dangerouslySetInnerHTML={this.createMarkup(script)} />
  }
}
