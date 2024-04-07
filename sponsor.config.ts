/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig, presets, Sponsorship } from 'sponsorkit'

export function onSponsorsFetched(sponsors: Sponsorship[]) {
  defineTierForSponsorInPast(sponsors, 'yaegassy', 100, new Date(2022, 6, 15, 0, 0, 0, 0).valueOf());
  defineTierForSponsorInPast(sponsors, 'programmierbar', 1000, new Date(2022, 5, 20, 0, 0, 0, 0).valueOf());

  for (const sponsor of sponsors) {
    if (sponsor.sponsor.login === 'marvin-robot') {
      sponsor.sponsor.login = 'PrefectHQ';
      sponsor.sponsor.name = 'Prefect';
      sponsor.sponsor.type = 'Organization';
      sponsor.sponsor.avatarUrl = 'https://avatars.githubusercontent.com/u/39270919?s=200&v=4';
    }
  }
}

export default defineConfig({
  onSponsorsFetched,
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

function defineTierForSponsorInPast(sponsors: Sponsorship[], username: string, tier: number, expire: number) {

  if (Date.now() > expire)
    return;

  let sponsor = sponsors.find(sponsor => sponsor.sponsor.login === username);
  if (sponsor) {
    sponsor.monthlyDollars = Math.max(sponsor.monthlyDollars, tier);
  }
}
