
hljs.initHighlightingOnLoad()

var $run = document.querySelectorAll('.run')
var $clip = document.querySelectorAll('.clip')

for(var i = 0; i < $run.length; i++) {
  $run[i].addEventListener('click', function(){
    eval(this.parentNode.parentNode.querySelector('code').textContent)
  })

  $clip[i].addEventListener('click', function(){
    var code = this.parentNode.querySelector('code')
    var range = document.createRange()
    range.selectNode(code)
    window.getSelection().addRange(range)
    try {
      var successful = document.execCommand('copy');
    } catch(err) {console.log('asd')}

    window.getSelection().removeAllRanges();  
  })
}
