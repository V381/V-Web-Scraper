const form = document.getElementById('scraperForm');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const url = document.getElementById('urlInput').value;
  const selector = document.getElementById('selectorInput').value;
  const headline = document.getElementById('headlineInput').value;
  console.log('URL:', url);
  console.log('Selector:', selector);
  console.log('Headline:', headline);
  form.reset();
});