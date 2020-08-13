import {ActionModel} from './ActionModel';
export interface ServiceInteractionModel extends ActionModel {

    service_name: string;
    item_id: string;
    item_brand: string;

    item_category: string;
    interaction_type: string;
    interaction_value: any;
}