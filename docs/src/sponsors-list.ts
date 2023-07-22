interface Sponsor {
  title: string;
  url: string;
  image?: string;
  text?: string;
  style?: string;
}

export const createSponsorsList = (sponsors: Sponsor[]) => `
<div class="sponsors">
  <div class="sponsors-title">Sponsors</div>
  <ul>
    ${sponsors.map((sponsor) => createSponsorItem(sponsor)).join('')}
    <li><a href="https://livecodes.io/docs/sponsor" title="Become a sponsor">Your Logo</a></li>
  </ul>
</div>
`;

const createSponsorItem = (sponsor: Sponsor) => `
<li>
  <a href="${sponsor.url}" target="_blank" rel="noopener" ${
  sponsor.style ? 'style="' + sponsor.style + '"' : ''
} ${sponsor.title ? 'title="' + sponsor.title + '"' : ''}>
    ${
      sponsor.image
        ? '<img loading="lazy" alt="' + sponsor.title + '" src="' + sponsor.image + '">'
        : ''
    }
    ${sponsor.text || ''}
  </a>
</li>
`;
