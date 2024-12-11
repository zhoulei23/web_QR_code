document.addEventListener('DOMContentLoaded', async () => {
  try {
    // 获取当前标签页信息
    const [tab] = await chrome.tabs.query({ 
      active: true, 
      currentWindow: true 
    }).catch(err => {
      console.error('Tab query error:', err);
      throw err;
    });

    if (!tab) {
      throw new Error('No active tab found');
    }

    const url = tab.url;
    const title = tab.title;
    
    console.log('Tab info:', { url, title });
    
    // 设置网站标题
    document.getElementById('title').textContent = title;
    
    // 设置favicon（直接显示，不合并到二维码中）
    const favicon = document.getElementById('favicon');
    favicon.src = `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=64`;
    
    // 生成二维码
    const qrcode = document.getElementById('qrcode');
    new QRCode(qrcode, {
      text: url,
      width: 200,
      height: 200,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });

  } catch (err) {
    console.error('General error:', err);
    document.body.innerHTML = `<div class="error">插件运行出错: ${err.message}</div>`;
  }
}); 