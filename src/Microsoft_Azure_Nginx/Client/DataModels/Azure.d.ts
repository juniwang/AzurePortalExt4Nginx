declare module DataModels {
    export module Azure {
        export interface Resource<T> {
            id: string;
            name: string;
            type: string;
            location: string;
            tags: Untyped;
            properties: T
        }

        export type ObservableResource<T> = Observable<Resource<T>>;

        export interface ListResponse<T> {
            value: T[];
        }

        export interface ObservableListResponse<T> {
            value: KnockoutObservableArray<T>;
        }

        export interface ListResponseProperties<T> extends ListResponse<Resource<T>> { }

        export interface ObservableListResponseProperties<T> extends ObservableListResponse<ObservableResource<T>> { }

        export interface NameCheck {
            type: string;
            name: string;
        }
    }
}