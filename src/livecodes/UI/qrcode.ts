import { loadScript, safeName } from '../utils/utils';
import { qrcodeUrl } from '../vendors';

export const generateQrCode = async ({
  container,
  url,
  title,
  logo,
}: {
  container: HTMLElement;
  url: string;
  title?: string;
  logo?: string;
}) => {
  const QRCode: any = await loadScript(qrcodeUrl, 'QRCode');
  container.style.visibility = 'hidden';
  const qr = new QRCode(container, {
    text: url,
    logo,
    width: 200,
    height: 200,
    drawer: 'canvas',
    onRenderingEnd: (_options: any, dataUrl: string) => {
      container.innerHTML = '';
      const qrcodeImg = document.createElement('img');
      qrcodeImg.src = dataUrl;
      qrcodeImg.style.cursor = 'pointer';
      qrcodeImg.title = window.deps.translateString(
        'share.qrcode.clickToDownload',
        'Click to download',
      );
      qrcodeImg.onclick = () => qr.download(safeName(title || 'LiveCodes', '-'));
      container.appendChild(qrcodeImg);
      container.style.visibility = 'visible';
    },
  });
};
