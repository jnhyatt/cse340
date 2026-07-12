create table organization (
    organization_id serial primary key,
    name varchar(150) not null,
    description text not null,
    contact_email varchar(255) not null,
    logo_filename varchar(255) not null
);
insert into organization (name, description, contact_email, logo_filename)
values (
        'BrightFuture Builders',
        'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
        'info@brightfuturebuilders.org',
        'brightfuture-logo.png'
    ),
    (
        'GreenHarvest Growers',
        'An urban farming collective promoting food sustainability and education in local neighborhoods.',
        'contact@greenharvest.org',
        'greenharvest-logo.png'
    ),
    (
        'UnityServe Volunteers',
        'A volunteer coordination group supporting local charities and service initiatives.',
        'hello@unityserve.org',
        'unityserve-logo.png'
    );
create table service_project (
    service_project_id serial primary key,
    organization_id integer not null references organization (organization_id),
    title varchar(150) not null,
    description text not null,
    location varchar(255) not null,
    occurs_at timestamptz not null
);
insert into service_project (
        organization_id,
        title,
        description,
        location,
        occurs_at
    )
values (
        1,
        'Community Housing Build Day',
        'Volunteers will help frame and finish walls for a new affordable housing unit.',
        '412 Elm Street, Salt Lake City, UT',
        '2026-08-15 08:00:00-06'
    ),
    (
        1,
        'Playground Renovation Project',
        'Rebuild aging playground equipment and lay fresh safety surfacing at a public park.',
        'Centennial Park, West Valley City, UT',
        '2026-08-29 08:00:00-06'
    ),
    (
        1,
        'Accessible Ramp Building Initiative',
        'Construct wheelchair-accessible ramps for elderly and disabled residents.',
        '955 University Ave, Provo, UT',
        '2026-09-12 08:00:00-06'
    ),
    (
        1,
        'Neighborhood Fence Repair Day',
        'Repair and repaint fencing damaged by winter storms throughout the neighborhood.',
        '8400 South State St, Sandy, UT',
        '2026-09-26 08:00:00-06'
    ),
    (
        1,
        'Emergency Shelter Expansion',
        'Help construct additional sleeping quarters for the local emergency shelter.',
        '7200 Union Park Ave, Midvale, UT',
        '2026-10-10 08:00:00-06'
    ),
    (
        2,
        'Neighborhood Garden Planting',
        'Help plant and mulch raised garden beds at the community urban farm.',
        'GreenHarvest Community Farm, 88 Orchard Ave, Salt Lake City, UT',
        '2026-08-22 09:00:00-06'
    ),
    (
        2,
        'Community Orchard Pruning',
        'Prune and care for fruit trees at the shared neighborhood orchard.',
        '746 State St, Orem, UT',
        '2026-09-05 09:00:00-06'
    ),
    (
        2,
        'Rooftop Garden Setup',
        'Install planter boxes and irrigation lines for a new rooftop garden.',
        '12351 S Draper Gate Dr, Draper, UT',
        '2026-09-19 09:00:00-06'
    ),
    (
        2,
        'Fall Harvest Festival Prep',
        'Prepare booths, signage, and produce displays for the annual harvest festival.',
        '3600 N Center St, Lehi, UT',
        '2026-10-03 09:00:00-06'
    ),
    (
        2,
        'School Garden Build',
        'Build raised garden beds for an elementary school science program.',
        '5200 S State St, Murray, UT',
        '2026-10-17 09:00:00-06'
    ),
    (
        3,
        'Food Pantry Sorting Drive',
        'Sort and package donated food items for distribution to local families.',
        'UnityServe Volunteer Center, 200 Main St, Salt Lake City, UT',
        '2026-09-05 10:00:00-06'
    ),
    (
        3,
        'Winter Coat Drive Distribution',
        'Sort donated winter coats and hand them out to families in need.',
        '10011 S Redwood Rd, South Jordan, UT',
        '2026-09-19 10:00:00-06'
    ),
    (
        3,
        'Senior Center Meal Delivery',
        'Package and deliver hot meals to homebound seniors across the valley.',
        '12830 S Redwood Rd, Riverton, UT',
        '2026-10-03 10:00:00-06'
    ),
    (
        3,
        'Back-to-School Supply Packing',
        'Assemble backpacks with school supplies for local students in need.',
        '31 N Church St, American Fork, UT',
        '2026-10-17 10:00:00-06'
    ),
    (
        3,
        'Holiday Toy Drive Sorting',
        'Sort and label donated toys for the annual holiday toy drive.',
        '150 W 100 S, Bountiful, UT',
        '2026-10-31 10:00:00-06'
    );