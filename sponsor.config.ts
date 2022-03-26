/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig, presets, Sponsorship } from 'sponsorkit'

export default defineConfig({
  onSponsorsFetched(sponsors) {
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
  },
  tiers: [
    {
      title: 'Sponsors',
      preset: presets.small,
      // to replace the entire tier rendering
      // compose: (composer, tierSponsors, config) => {
      //   composer.addRaw(
      //     '<-- custom svg -->',
      //   )
      // },
    },
    {
      title: 'Generous Sponsors',
      monthlyDollars: 20,
      preset: presets.base,
      // to insert custom elements after the tier block
      composeAfter: (composer, tierSponsors, config) => {
        composer.addSpan(10)
      },
    },
    {
      title: 'Silver Sponsors',
      monthlyDollars: 100,
      preset: presets.medium,
    },
    // {
    //   title: 'Gold Sponsors',
    //   monthlyDollars: 250,
    //   preset: presets.large,
    // },
    {
      title: 'Platinum Sponsors',
      monthlyDollars: 1000,
      preset: presets.xl,
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
