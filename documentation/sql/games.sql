drop table if exists profile;
drop table if exists listing;
drop table if exists message;
drop table if exists category;

create table profile(
    profile_id uuid not null,
    profile_avatar_url varchar(128),
    profile_email varchar(128) not null unique,
    profile_hash varchar(97) not null,
    profile_name varchar(128) not null,
    primary key(profile_id)
);

create table listing(
    listing_id uuid not null,
    listing_category_id uuid not null,
    listing_profile_id uuid not null,
    listing_condition varchar(32) not null,
    listing_description varchar(512) not null,
    listing_image_url varchar(128),
    listing_name varchar(128) not null,
    foreign key (listing_category_id) references category(category_id),
    foreign key (listing_profile_id) references profile(profile_id),
    primary key (listing_id)
);

create table message(
    message_id uuid not null,
    message_listing_id uuid not null,
    message_profile_id uuid not null,
    message_receiver_id uuid not null,
    message_date varchar(16) not null,
    message_texts varchar(300) not null,
    foreign key (message_listing_id) references listing(listing_id),
    foreign key (message_profile_id) references profile(profile_id),
    foreign key (message_receiver_id) references profile(profile_id),
    primary key (message_id)
);

create table category(
    category_id uuid not null,
    category_name varchar(32) not null,
    primary key (category_id)
)