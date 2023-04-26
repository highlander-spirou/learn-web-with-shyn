class Pagination {
    collectionRef;
    itemPerPage: number;
    query: object;
    result: any;
    sorter?: Record<string, any>;

    constructor(collectionRef:any, itemPerPage: number, query: object, sorter?: Record<string, any>) {
        this.collectionRef = collectionRef
        this.itemPerPage = itemPerPage
        this.sorter = sorter === null ? undefined : sorter
        this.query = query === null ? {} : query
    }

    get sorterKey() {
        return this.sorter !== undefined ? Object.keys(this.sorter)[0] : ""
    }

    get sortCondition() {
        return Object.values(this.sorter)[0] === 1 ? "$gt" : "$lt"
    }

    getLastPaginateParams() {
        const returnObj: Record<string, any> = {}
        const lastItem = this.result[this.result.length - 1]
        if (this.sorterKey) {
            returnObj[this.sorterKey] = lastItem[this.sorterKey]
        }
        returnObj["tiebreaker"] = lastItem._id
        return returnObj
    }

    paginateQueryBuilder() {
        const params = this.getLastPaginateParams()
        return {
            $or: [
                { [this.sorterKey]: { [this.sortCondition]: params[this.sorterKey] } },
                {
                    [this.sorterKey]: params[this.sorterKey],
                    _id: { $gt: params.tiebreaker }
                }
            ]
        }
    }

    queryBuilder() {
        if (this.sorter === undefined || this.result == null) {
            return this.query
        }
        const paginateQuery = this.paginateQueryBuilder()
        return { $and: [this.query, paginateQuery] };
    }


    async next() {
        const paginatedQuery = this.queryBuilder()
        const result = await this.collectionRef.find(paginatedQuery).limit(3).sort(this.sorter).toArray()
        this.result = result
        return result
    }


}

export default Pagination