class ApiRouteBuilder {
    private route: string;
    private filters: string;
    private selections: string = "";
    private expansions: string = "";

    constructor(route: string) {
        this.route = route;
        this.filters = "";
        this.selections = "";
        this.expansions = "";
    }

    public filter(field: string, value: string): ApiRouteBuilder {
        this.filters += `${this.isEmptyFilter() ? "" : ","}${field} eq ${value}`;
        return this;
    }

    public select(fields: string | string[]): ApiRouteBuilder {
        if (typeof fields === "string") {
            this.selections += `${this.isEmptySelections() ? "" : ","}${fields}`;
        } else {
            this.selections += `${this.isEmptySelections() ? "" : ","}${fields.join(",")}`;
        }
        return this;
    }

    public expand(
        property: string,
        fields?: string | string[]
    ): ApiRouteBuilder {
        if (fields) {
            if (typeof fields === "string") {
                this.expansions += `${this.isEmptyExpansions() ? "" : ","}${property}($select=${fields})`;
            } else {
                this.expansions += `${this.isEmptyExpansions() ? "" : ","}${property}($select=${fields.join(",")})`;
            }
        } else {
            this.expansions += `${this.isEmptyExpansions() ? "" : ","}${property}`;
        }
        return this;
    }

    // add more query methods when needed
    public build(): string {
        if (!this.isEmptyFilter()) {
            this.filters = `$filter=${this.filters}`;
        }
        if (!this.isEmptySelections()) {
            this.selections = `$select=${this.selections}`;
        }
        if (!this.isEmptyExpansions()) {
            this.expansions = `$expand=${this.expansions}`;
        }
        return this.appendQuery(this.filters)
            .appendQuery(this.selections)
            .appendQuery(this.expansions).route;
    }

    private appendQuery(query: string): ApiRouteBuilder {
        const isFirst = !this.route.includes("?");
        if (query) {
            this.route += `${isFirst ? "?" : "&"}${query}`;
        }
        return this;
    }

    private isEmptyFilter(): boolean {
        return this.filters.length === 0;
    }

    private isEmptySelections(): boolean {
        return this.selections.length === 0;
    }

    private isEmptyExpansions(): boolean {
        return this.expansions.length === 0;
    }
}

export default ApiRouteBuilder;
