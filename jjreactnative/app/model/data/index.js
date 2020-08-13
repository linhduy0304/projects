

export interface SituationModel {
    screen_name: string,
    section: string;
    section_type: string;
    position: any;
}

export interface ActionModel {
    screen_name: string;
    section: string;
}

export interface ItemListInteractionModel extends SituationModel {
    item_id: string;
    item_brand: string;
    item_category: string;
    interaction_type: string;
    interaction_value: any;
}

export interface ServiceInteractionModel extends ActionModel {
    service_name: string;
    item_id: string;
    item_brand: string;
    item_category: string;
    interaction_type: string;
    interaction_value: any;
}