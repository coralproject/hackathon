

function flaggedWordCount() {
  return xenia()
    .collection('comments')
    .group({ _id: '$status', count: { $sum: 1 } })
    .sort(['count', -1])
  .exec()
}

flaggedWordCount().then(function(res) {
  var data = res.results[0].Docs
  var moderated = data
  .filter(function(d){ return d._id !== 'Untouched' })
  var count = moderated.reduce(function(p, c){ return p + c.count }, 0)
  var commentTypes = {}
  moderated.forEach(function(d){
    commentTypes[d._id] = {
      ratio: d.count / count,
      count: d.count
    }
  })

  // Explanation
  var untouched = data.filter(function(d){ return d._id === 'Untouched' })[0]
  var total = untouched.count + count
  var highest = moderated[0]._id
  var type = highest.match(/[A-Z][a-z]+/g)
  document.querySelector('.highest-moderated-percentage').textContent = (commentTypes[highest].ratio * 100).toFixed(2)
  document.querySelector('.highest-moderated-type').textContent = type[1].toLowerCase()
  document.querySelector('.moderator-flagged-percentage').textContent = (commentTypes['ModeratorFlagged'].ratio * 100).toFixed(2)
  document.querySelector('.untouched-number').textContent = untouched.count
  document.querySelector('.untouched-percentage').textContent = ((untouched.count / total) * 100).toFixed(2)

  // Chart
  var ctx = document.querySelector('#moderation-chart').getContext('2d')
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: moderated.map(function(d){ return d._id }),
      datasets: [{
        label: 'Status',
        data: moderated.map(function(d){ return d.count })
      }]
    }
  });

  // Make it visible
  document.querySelector('#moderation').className = ''
})
