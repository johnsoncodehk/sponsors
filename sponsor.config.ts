/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig, presets } from 'sponsorkit'

export default defineConfig({
  renderer: 'circles',
  tiers: [
    {
      title: 'Sponsors',
      compose(composer, sponsors) {
        composer.addTitle('Sponsors');
        composer.addSponsorGrid(sponsors.filter(sponsor => sponsor.monthlyDollars >= 20), presets.medium);
        composer.addSponsorGrid(sponsors.filter(sponsor => sponsor.monthlyDollars >= 8 && sponsor.monthlyDollars < 20), presets.base);
        composer.addSponsorGrid(sponsors.filter(sponsor => sponsor.monthlyDollars < 8), presets.small);
        composer.addSpan(35);
        composer.addText('Thank you 💚');
      },
    },
    {
      title: 'Silver/Company Sponsors',
      monthlyDollars: 100,
      preset: presets.large,
    },
  ],
})
