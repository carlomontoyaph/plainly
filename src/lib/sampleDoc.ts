import type { AnalysisResult } from './types';

export const SAMPLE_DOC = {
  name: 'StreamNest_Terms_of_Service.txt',
  label: 'Terms of Service',
  text: `STREAMNEST — TERMS OF SERVICE
Last Updated: March 1, 2026

PLEASE READ THESE TERMS OF SERVICE ("Terms") CAREFULLY. BY CREATING AN ACCOUNT, INSTALLING, OR USING THE STREAMNEST APPLICATION AND RELATED SERVICES (THE "SERVICE"), YOU AGREE TO BE BOUND BY THESE TERMS. IF YOU DO NOT AGREE, DO NOT USE THE SERVICE.

1. ACCEPTANCE AND ELIGIBILITY
You represent that you are at least 18 years of age and have the legal capacity to enter into a binding agreement. Your continued use of the Service constitutes ongoing acceptance of these Terms as they may be amended from time to time.

2. SUBSCRIPTION, BILLING, AND AUTOMATIC RENEWAL
2.1 The Service is offered on a recurring subscription basis. By providing a payment method, you authorize StreamNest to charge the applicable fees, plus taxes, to that payment method.
2.2 YOUR SUBSCRIPTION WILL AUTOMATICALLY RENEW at the end of each billing cycle UNLESS you cancel at least seventy-two (72) hours before the renewal date. Renewal charges will be billed at the then-current rate, which may be higher than your introductory rate.
2.3 All fees are non-refundable, including for partial billing periods, downgrades, or unused time, except where required by law.
2.4 StreamNest may change subscription prices at any time. Price changes take effect at the start of the next billing cycle. Where required, we will provide notice; otherwise continued use constitutes acceptance.

3. CHANGES TO THESE TERMS
StreamNest reserves the right to modify these Terms at any time in its sole discretion. Material changes may be communicated by posting the revised Terms with a new "Last Updated" date. It is your responsibility to review the Terms periodically. Your continued use after changes are posted constitutes your acceptance.

4. LICENSE AND RESTRICTIONS
Subject to these Terms, StreamNest grants you a limited, non-exclusive, non-transferable, revocable license to access the Service for personal, non-commercial use. You may not copy, reverse engineer, resell, or create derivative works from any part of the Service.

5. USER CONTENT AND LICENSE GRANT
5.1 You retain ownership of content you upload ("User Content").
5.2 By submitting User Content, you grant StreamNest a perpetual, irrevocable, worldwide, royalty-free, sublicensable, and transferable license to use, host, store, reproduce, modify, publish, distribute, and create derivative works from your User Content for any purpose, including commercial and promotional purposes, even after you delete your account.

6. DATA COLLECTION AND THIRD-PARTY SHARING
6.1 We collect device identifiers, usage data, approximate location, and viewing history.
6.2 We may share, sell, or license aggregated and de-identified data, and in certain cases personally identifiable information, with third-party partners, advertisers, and data brokers for marketing and analytics purposes.
6.3 You may opt out of certain sharing by adjusting your account settings, where such options are made available.

7. MANDATORY ARBITRATION AND CLASS ACTION WAIVER
7.1 YOU AND STREAMNEST AGREE THAT ANY DISPUTE SHALL BE RESOLVED EXCLUSIVELY THROUGH FINAL AND BINDING INDIVIDUAL ARBITRATION, AND NOT IN A COURT OF LAW.
7.2 YOU WAIVE YOUR RIGHT TO A TRIAL BY JURY AND YOUR RIGHT TO PARTICIPATE IN A CLASS ACTION, CLASS ARBITRATION, OR ANY OTHER REPRESENTATIVE PROCEEDING.
7.3 You may opt out of this arbitration provision by sending written notice within thirty (30) days of first accepting these Terms.

8. DISCLAIMER OF WARRANTIES
THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.

9. LIMITATION OF LIABILITY
TO THE MAXIMUM EXTENT PERMITTED BY LAW, STREAMNEST'S TOTAL LIABILITY FOR ANY CLAIM ARISING OUT OF OR RELATING TO THE SERVICE SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID IN THE THREE (3) MONTHS PRECEDING THE CLAIM, OR (B) FIFTY DOLLARS ($50). STREAMNEST SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES.

10. TERMINATION
StreamNest may suspend or terminate your access at any time, with or without cause, and with or without notice. Upon termination, your right to use the Service ceases immediately, and no refunds will be issued.

11. GOVERNING LAW
These Terms are governed by the laws of the State of Delaware, without regard to its conflict-of-laws principles. Subject to Section 7, any permitted court proceedings shall take place exclusively in the courts located in Wilmington, Delaware.

12. ENTIRE AGREEMENT
These Terms constitute the entire agreement between you and StreamNest and supersede all prior agreements. If any provision is found unenforceable, the remaining provisions will remain in full force and effect.`,

  breakdown: {
    docLabel: 'Terms of Service',
    docType: 'This is the contract you agree to when you use the StreamNest streaming app. It sets the rules for your subscription, your content, your data, and how disputes are handled.',
    summary: [
      'Your subscription auto-renews unless you cancel 72 hours early.',
      'You give StreamNest a forever license to anything you upload.',
      'You give up your right to sue in court or join a class action.',
      'Your data can be shared or sold to advertisers and brokers.',
    ],
    requires: [
      'Be at least 18 and pay the recurring fee, plus tax, on your billing date.',
      'Cancel at least 72 hours before renewal or you\'ll be charged again.',
      'Accept that StreamNest can change the price or terms, and continued use means you agree.',
      'Opt out of arbitration in writing within 30 days if you don\'t want to be bound by it.',
    ],
    redFlags: [
      { flag: 'It renews and re-charges you automatically every cycle unless you cancel in time.', quote: 'YOUR SUBSCRIPTION WILL AUTOMATICALLY RENEW' },
      { flag: 'Money you\'ve paid is generally not refundable, even for unused time.', quote: 'All fees are non-refundable' },
      { flag: 'Anything you upload can be used by them forever, even for profit, after you delete it.', quote: 'perpetual, irrevocable, worldwide, royalty-free, sublicensable, and transferable license' },
      { flag: 'Your personal data may be shared or sold to advertisers and data brokers.', quote: 'sell, or license aggregated and de-identified data' },
      { flag: 'You waive court, a jury, and class actions — disputes go to private arbitration.', quote: 'BINDING INDIVIDUAL ARBITRATION' },
      { flag: 'Their financial responsibility to you is capped at as little as $50.', quote: 'FIFTY DOLLARS ($50)' },
    ],
    mistakes: [
      'Assuming you can cancel anytime and get money back — refunds are not given.',
      'Missing the 30-day window to opt out of forced arbitration.',
      'Not realizing \'continued use\' counts as agreeing to new prices and terms.',
    ],
  } as AnalysisResult,
};
