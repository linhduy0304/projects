const configSchema = {
  name: 'Config',
  primaryKey: 'config_key',
  properties: {
    config_key: { type: 'int' },
    show_save_deal_popover: { type: 'bool', default: false, optional: true },
    selected_province: {
      type: 'ProvinceSelected',
      default: { name: 'Hà Nội', id: 'ha-noi' },
      optional: true
    },
    welcome_new_version_visible: {
      type: 'bool',
      default: false,
      optional: true
    },
    filter_button_popover_visible: {
      type: 'bool',
      default: false,
      optional: true
    },
    tab_discovery_button_popover_visible: {
      type: 'bool',
      default: false,
      optional: true
    },
    tab_booking_button_popover_visible: {
      type: 'bool',
      default: false,
      optional: true
    },
    booking_change_date_button_popover_visible: {
      type: 'bool',
      default: false,
      optional: true
    },
    ios_notification_permission_request: {
      type: 'bool',
      default: false,
      optional: true
    },
    did_merge_user_profile: { type: 'bool', default: false, optional: true },
    sound_open: { type: 'bool', default: true, optional: true },

    one_signal: {
      type: 'OneSignal',
      default: { player_id: '', device_token: '' },
      optional: true
    },
    uuid_config: { type: 'UUID', default: undefined, optional: true },
    tracking: { type: 'Tracking', default: undefined, optional: true },

    banner_logs: 'BannerLog[]'
  }
};

const provinceSelectedSchema = {
  name: 'ProvinceSelected',
  properties: {
    id: { type: 'string', default: 'ha-noi', optional: false },
    name: { type: 'string', default: 'Hà Nội', optional: true }
  }
};

const userSchema = {
  name: 'User',
  primaryKey: 'user_key',
  properties: {
    user_key: { type: 'int' },
    id: { type: 'string', default: '', optional: false },
    access_token: { type: 'string', default: '', optional: false },
    avatar: { type: 'string', default: '', optional: true },
    email: { type: 'string', default: '', optional: true },
    expires_in: { type: 'double', default: 0, optional: true },
    full_name: { type: 'string', default: '', optional: true },
    link: { type: 'string', default: '', optional: true },
    phone_number: { type: 'string', default: '', optional: true },
    refresh_token: { type: 'string', default: '', optional: true },
    scope: { type: 'string', default: '', optional: true },
    token: { type: 'string', default: '', optional: true },
    token_type: { type: 'string', default: '', optional: true },
    username: { type: 'string', default: '', optional: true },
    game_user_referral_url: { type: 'string', default: '', optional: true },

    contact_info_full_name: { type: 'string', default: '', optional: true },
    contact_info_email: { type: 'string', default: '', optional: true },
    contact_info_phone_number: { type: 'string', default: '', optional: true },

    movie_holding_popup_guide: { type: 'int', default: 0, optional: true }
  }
};

const uuidSchema = {
  name: 'UUID',
  properties: {
    acs: { type: 'string', default: '', optional: true },
    drs: { type: 'string', default: '', optional: true },
    id: { type: 'string', default: '', optional: false },
    platform: { type: 'string', default: '', optional: true },
    platform_version: { type: 'string', default: '', optional: true },
    resource_uri: { type: 'string', default: '', optional: true },
    created: { type: 'date', default: '', optional: true },
    modified: { type: 'date', default: '', optional: true }
  }
};

const oneSignalSchema = {
  name: 'OneSignal',
  properties: {
    player_id: { type: 'string', default: '', optional: true },
    device_token: { type: 'string', default: '', optional: true }
  }
};

const trackingSchema = {
  name: 'Tracking',
  properties: {
    first_campaign: { type: 'string', default: '', optional: true },
    last_source: { type: 'string', default: '', optional: true },
    last_medium: { type: 'string', default: '', optional: true },
    last_campaign: { type: 'string', default: '', optional: true },
    last_term: { type: 'string', default: '', optional: true },
    last_content: { type: 'string', default: '', optional: true }
  }
};

const brandSchema = {
  name: 'Brand',
  properties: {
    id: { type: 'string', default: '', optional: true },
    brand_name: { type: 'string', default: '', optional: true },
    brand_slug: { type: 'string', default: '', optional: true },
    brand_desc: { type: 'string', default: '', optional: true },
    image: { type: 'string', default: '', optional: true }
  }
};

const storeSchema = {
  name: 'Store',
  properties: {
    id: { type: 'string', default: '', optional: true },
    address: { type: 'string', default: '', optional: true },
    ipos_store_id: { type: 'string', default: '', optional: true },
    latitude: { type: 'double', default: 0, optional: true },
    longitude: { type: 'double', default: 0, optional: true },
    phone_number: { type: 'string', default: '', optional: true },
    status: { type: 'int', default: 0, optional: true }
  }
};

const imageSchema = {
  name: 'Image',
  properties: {
    id: { type: 'string', default: '', optional: true },
    link: { type: 'string', default: '', optional: true },
    fh: { type: 'int', default: 0, optional: true },
    fw: { type: 'int', default: 0, optional: true },
    th: { type: 'int', default: 0, optional: true },
    thumbnail: { type: 'string', default: '', optional: true },
    thumbnail_w: { type: 'string', default: '', optional: true },
    tw: { type: 'int', default: 0, optional: true },
    twh: { type: 'int', default: 0, optional: true },
    tww: { type: 'int', default: 0, optional: true }
  }
};

const promoCodeSchema = {
  name: 'PromoCode',
  properties: {
    id: { type: 'string', default: '', optional: true },
    code_name: { type: 'string', default: '', optional: true },
    condition: { type: 'string', default: '', optional: true },
    description: { type: 'string', default: '', optional: true },
    discount_buy_number: { type: 'int', default: 0, optional: true },
    discount_fixed_price: { type: 'int', default: 0, optional: true },
    discount_get_number: { type: 'int', default: 0, optional: true },
    discount_percentage: { type: 'int', default: 0, optional: true },
    discount_value: { type: 'int', default: 0, optional: true },
    end_code_time: { type: 'string', default: '', optional: true },
    offer_type: { type: 'string', default: '', optional: true },
    optimize_type: { type: 'string', default: '', optional: true },
    start_code_time: { type: 'string', default: '', optional: true },
    state: { type: 'string', default: '', optional: true },
    status: { type: 'string', default: '', optional: true },
    type_promocode: { type: 'string', default: '', optional: true }
  }
};

const dealSchema = {
  name: 'Deal',
  properties: {
    id: { type: 'string', default: '', optional: true },
    booking_slot: { type: 'int', default: 0, optional: true },
    booking_store: { type: 'string', default: '', optional: true },
    booking_username: { type: 'string', default: '', optional: true },
    brand: 'Brand?',
    check_in_time: { type: 'double', default: 0, optional: true },
    code: { type: 'string', default: '', optional: true },
    code_status: { type: 'int', default: 0, optional: true },
    condition: { type: 'string', default: '', optional: true },
    coupon_id: { type: 'string', default: '', optional: true },
    deal_type: { type: 'string', default: '', optional: true },
    end_sale_time: { type: 'string', default: '', optional: true },
    end_valid_time: { type: 'string', default: '', optional: true },
    highlight: { type: 'string', default: '', optional: true },
    highlight_title: { type: 'string', default: '', optional: true },
    hint_text: { type: 'string', default: '', optional: true },
    images: 'Image[]',
    redeem_destination_url: { type: 'string', default: '', optional: true },
    redeem_url: { type: 'string', default: '', optional: true },
    share_url: { type: 'string', default: '', optional: true },
    slug: { type: 'string', default: '', optional: true },
    start_sale_time: { type: 'string', default: '', optional: true },
    start_valid_time: { type: 'string', default: '', optional: true },
    stores: 'Store[]',
    title: { type: 'string', default: '', optional: true },

    start_countdown_time: { type: 'string', default: '', optional: true },
    start_redeem_time: { type: 'string', default: '', optional: true },
    is_display_as_alias: { type: 'bool', default: false, optional: true },
    use_delivery: { type: 'bool', default: false, optional: true }
  }
};

const couponSchema = {
  name: 'Coupon',
  primaryKey: 'id',
  properties: {
    id: { type: 'string', default: '', optional: true },
    booking_note: { type: 'string', default: '', optional: true },
    booking_platform: { type: 'string', default: '', optional: true },
    booking_platform_version: { type: 'string', default: '', optional: true },
    booking_schedule_id: { type: 'string', default: '', optional: true },
    booking_survey: { type: 'string', default: '', optional: true },
    cancel_time: { type: 'string', default: '', optional: true },
    check_in_time: { type: 'double', default: 0, optional: true },
    code: { type: 'string', default: '', optional: true },
    coupon_highlight: { type: 'string', default: '', optional: true },
    deal: 'Deal?',
    did: { type: 'string', default: '', optional: true },
    email: { type: 'string', default: '', optional: true },
    phone_number: { type: 'string', default: '', optional: true },
    promocode: 'PromoCode?',
    promocode_id: { type: 'string', default: '', optional: true },
    redeem_destination_url: { type: 'string', default: '', optional: true },
    redeem_url: { type: 'string', default: '', optional: true },
    result_message: { type: 'string', default: '', optional: true },
    result_title: { type: 'string', default: '', optional: true },
    slot: { type: 'int', default: 0, optional: true },
    slot_count: { type: 'int', default: 0, optional: true },
    status: { type: 'int', default: 0, optional: true },
    store: 'Store?',
    user_name: { type: 'string', default: '', optional: true },

    start_countdown_time: { type: 'string', default: '', optional: true },
    start_redeem_time: { type: 'string', default: '', optional: true },
    is_display_as_alias: { type: 'bool', default: false, optional: true },
    use_delivery: { type: 'bool', default: false, optional: true }
  }
};

const bannerLogSchema = {
  name: 'BannerLog',
  properties: {
    id: { type: 'string', default: '', optional: false },
    visible_count: { type: 'int', default: 0, optional: true }
  }
};

const DeliveryLocationSchema = {
  name: 'DeliveryLocationHistory',
  properties: {
    address: { type: 'string', optional: true },
    lat: { type: 'double', optional: true },
    long: { type: 'double', optional: true }
  }
};

const deliveryDraffSchema = {
  name: 'DeliveryDraff',
  properties: {
    coupon_id: { type: 'string', optional: true },
    check_in_time: { type: 'double', default: 0, optional: true },
    products: 'ProductDraff[]',
    totalQuantity: { type: 'double', default: 0, optional: true },
  }
};

const productSchema = {
  name: 'ProductDraff',
  properties: {
    id: { type: 'string', default: '', optional: true },
    idPicking: { type: 'string', default: '', optional: true },
    is_discounted: { type: 'bool', default: '', optional: true },
    note: { type: 'string', default: '', optional: true },
    original_price: { type: 'double', default: 0, optional: true },
    quantity: { type: 'double', default: 0, optional: true },
    title: { type: 'string', default: '', optional: true },
    image: { type: 'string', default: '', optional: false },
    ipos_image_url: { type: 'string', default: '', optional: false },
    itemIndex: { type: 'int', default: 0, optional: true },
    product_code: { type: 'string', default: '', optional: true },
    source: { type: 'string', default: '', optional: true },
    customizations: 'Customization[]',
  }
};

const customizationSchema = {
  name: 'Customization',
  properties: {
    cat_id: { type: 'string', default: '', optional: true },
    title: { type: 'string', default: '', optional: true },
    options: 'Option[]',
    max_permitted: { type: 'double', default: 0, optional: true },
    min_permitted: { type: 'double', default: 0, optional: true },
    quantity: { type: 'double', default: 0, optional: true },
  }
};

const optionSchema = {
  name: 'Option',
  properties: {
    id: { type: 'string', default: '', optional: true },
    product_code: { type: 'string', default: '', optional: true },
    original_price: { type: 'double', default: 0, optional: true },
    selected: { type: 'bool', default: '', optional: true },
    title: { type: 'string', default: '', optional: true },
  }
};

const realmSchema = {
  configSchema,
  provinceSelectedSchema,
  userSchema,
  uuidSchema,
  oneSignalSchema,
  trackingSchema,
  brandSchema,
  storeSchema,
  imageSchema,
  promoCodeSchema,
  dealSchema,
  couponSchema,
  bannerLogSchema,
  DeliveryLocationSchema,
  deliveryDraffSchema,
  productSchema,
  customizationSchema,
  optionSchema
};

exports.RealmSchema = realmSchema;
