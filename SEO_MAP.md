# SEO and answer-intent map

Non-production builds are globally noindex. Production indexing is enabled only on the approved
production domain. Package pages marked owner-gated remain noindex and excluded from the sitemap.

| Route                                      | Primary intent/query                                     | Title direction                                       | Description direction                                       | Priority internal links                               | Status                              |
| ------------------------------------------ | -------------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------- | ----------------------------------- |
| `/`                                        | Orange County event planner; event planning and design   | Orange County Event Planner & Design Studio           | Planner-first definition, event breadth, vendor flexibility | Services, five event types, process, network, contact | Ready for owner review              |
| `/services/`                               | Event planning services Orange County                    | Event Planning Services in Orange County              | Scope-led overview with package caveat                      | Package previews, event types, process, contact       | Ready                               |
| `/services/full-service-planning-design/`  | Full-service event planner Orange County                 | Full-Service Event Planning & Design in Orange County | Roadmap, design, vendor coordination, logistics             | Services, process, weddings, contact                  | Owner-gated/noindex                 |
| `/services/partial-planning/`              | Partial event planning Orange County                     | Partial Event Planning in Orange County               | Selected support for in-progress plans                      | Services, process, contact                            | Owner-gated/noindex                 |
| `/services/event-management-coordination/` | Event coordinator Orange County                          | Event Management & Coordination in Orange County      | Approved-plan handoff and event-day scope                   | Services, process, contact                            | Owner-gated/noindex                 |
| `/events/weddings/`                        | Wedding planner Orange County                            | Wedding Planner in Orange County                      | Wedding roadmap, design, vendors, logistics                 | Services, process, network, contact                   | Ready                               |
| `/events/baby-bridal-showers/`             | Baby shower planner; bridal shower planner Orange County | Baby & Bridal Shower Planner in Orange County         | Guest flow, design, rentals, vendors                        | Services, process, contact                            | Ready                               |
| `/events/birthdays-milestones/`            | Party planner Orange County                              | Party Planner in Orange County                        | Adult, first-birthday, anniversary, and milestone planning  | Services, kids, process, contact                      | Ready                               |
| `/events/kids-parties/`                    | Kids party planner Orange County                         | Kids’ Party Planning & Design in Orange County        | Age-aware flow, theme, vendors, safety boundaries           | Birthdays, services, process, contact                 | Ready                               |
| `/events/corporate-brand-events/`          | Corporate event planner Orange County                    | Corporate Event Planner in Orange County              | Objectives, attendee flow, production, approvals            | Services, process, contact                            | Ready                               |
| `/celebrations/`                           | Orange County event planner portfolio                    | Planned Celebrations                                  | Explain how future stories prove planning work              | Event types, contact                                  | Empty-state/noindex until real work |
| `/process/`                                | Event planning process Orange County                     | Our Event Planning Process                            | Four-step planning and vendor-flexibility model             | Services, event types, contact                        | Ready                               |
| `/about/`                                  | Orange County event planning studio                      | About The OC Events Market                            | Entity and positioning without a fabricated biography       | Process, network, contact                             | Ready                               |
| `/trusted-creative-network/`               | Event planner that works with own vendors                | Trusted Creative Network                              | Trusted network without vendor lock-in or directory framing | Services, for vendors, contact                        | Ready                               |
| `/journal/`                                | Orange County event planning advice                      | Event Planning Journal                                | Owner-reviewed, first-hand planning resources               | Services, process, contact                            | Noindex until real articles         |
| `/contact/`                                | Hire/check availability event planner Orange County      | Plan Your Orange County Event                         | Inquiry expectations and planning inputs                    | Privacy, services                                     | Ready; form needs production host   |
| `/for-vendors/`                            | Orange County event planner vendor inquiry               | Vendor Partner Inquiries                              | Separate vendor introduction flow                           | Network, privacy                                      | Ready; form needs production host   |
| `/privacy/`                                | Privacy notice                                           | Privacy Notice                                        | Data handling template                                      | Contact, terms                                        | Noindex/legal review                |
| `/terms/`                                  | Website terms                                            | Website Terms                                         | Terms template                                              | Privacy, contact                                      | Noindex/legal review                |
| `/accessibility/`                          | Accessibility statement                                  | Accessibility Statement                               | Accessibility commitment and contact path                   | Contact                                               | Ready                               |

Do not create city doorway pages. Add a location route only when it has unique local projects, venue
knowledge, logistics, images, and proof.

## Search Console baseline: August 3, 2026 export

The export is configured for the last three months, but this site has usable data only from July 30
through August 2. It records 125 property-level impressions, no clicks, and an average position near
76 by August 2. That is enough to validate search intent, but not enough to judge CTR or declare a
ranking trend.

| Listed query cluster   | Impressions | Weighted position | Primary target                                              |
| ---------------------- | ----------: | ----------------: | ----------------------------------------------------------- |
| Wedding and bridal     |          36 |              77.8 | `/events/weddings/`; shower page for shower-specific intent |
| General event planning |          37 |              81.2 | `/` for the entity; `/services/` for service scope          |
| Corporate planning     |          20 |              76.9 | `/events/corporate-brand-events/`                           |
| Party planning         |           9 |              70.2 | `/events/birthdays-milestones/`                             |
| Adjacent or ambiguous  |          12 |              82.5 | Do not target without service proof                         |

The page table is aggregated by page, so its totals do not reconcile to the property-level chart.
Its strongest page signals are weddings (68 impressions), services (52), celebrations (45), and
corporate and brand events (31). The first optimization pass therefore aligns the descriptive
`<title>`, visible `<h1>`, and `Service.serviceType` on those intent pages. It does not add doorway
pages, repeat keyword variants, or claim catering and event-production services that the site does
not prove.

The `/process/` page recorded five page impressions at position 55.8. Keep it as a supporting route
for now and reconsider its role only after enough data exists to distinguish a useful process query
from incidental impressions.

Re-evaluate after at least four more complete weeks. Compare query clusters, landing pages, clicks,
CTR, and position against this baseline before making another title or heading pass.
