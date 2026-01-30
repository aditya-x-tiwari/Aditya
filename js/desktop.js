// Show window when taskbar icon clicked
document.querySelectorAll('.taskbar-icon').forEach(icon => {
  icon.addEventListener('click', () => {
    const app = document.getElementById(icon.dataset.app);
    if(app) app.style.display = 'block';
  });
});

// Close window
document.querySelectorAll('.close-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    btn.closest('.window').style.display = 'none';
  });
});
