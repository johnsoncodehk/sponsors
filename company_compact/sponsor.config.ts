import { defineConfig } from 'sponsorkit'
import { onSponsorsFetched } from '../sponsor.config'
import { companys } from '../company/sponsor.config'

export default defineConfig({
  onSponsorsFetched,
  customComposer(composer, sponsors, config) {

    const companySponsors = sponsors
      .sort((a, b) => b.monthlyDollars - a.monthlyDollars)
      .filter(sponsor => sponsor.monthlyDollars >= 100)
      .filter(sponsor => !!companys[sponsor.sponsor.login]);

    composer.height = 20;
    addCompanySponsors(companySponsors, 378, 84);
    composer.height += 20;

    function addCompanySponsors(sponsorsToAdd: typeof sponsors, width: number, height: number) {

      const baseLeft = 20;
      const add = sponsorsToAdd.map(sponsor => companys[sponsor.sponsor.login] ? { sponsor, company: companys[sponsor.sponsor.login] } : undefined).filter(sponsor => !!sponsor);

      let left = baseLeft;

      for (let j = 0; j < add.length; j++) {
        const w = add[j].sponsor.monthlyDollars >= 400 ? width : height;
        const image = add[j].sponsor.monthlyDollars >= 400 ? add[j].company.logo : add[j].sponsor.sponsor.avatarUrlHighRes;
        const svg = `<a xlink:href="${add[j].company.url}" class="sponsor-link" target="_blank" id="${add[j].sponsor.sponsor.login}">
            <image x="${left}" y="${composer.height}" width="${w}" height="${height}" xlink:href="${image}"/>
          </a>`;
        composer.addRaw(svg);
        left += w + 10;
      }

      composer.height += height;
    }
  },
})
