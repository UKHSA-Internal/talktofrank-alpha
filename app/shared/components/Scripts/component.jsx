import React from 'react'

const Scripts = (props) => {
  return (
    <React.Fragment>
      <script src={'/ui/js/vendor/promise.polyfill.min.js'}></script>
      <script src={'/ui/js/vendor.bundle.js?v=' + props.cacheTS}></script>
      <script src={'/ui/js/client.bundle.js?v=' + props.cacheTS}></script>
    </React.Fragment>
  )
}

export default Scripts
