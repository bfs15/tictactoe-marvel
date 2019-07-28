
export interface ICharacterCollection {
	available: number,
	collectionURI: string,
	items: {
		resourceURI: string,
		name: string
	}[],
	returned: number
}

export interface ICharacter {
	id: number,
	name: string,
	description: string,
	modified: Date,
	thumbnail: {
		path: string,
		extension: string
	},
	resourceURI: string,
	comics: ICharacterCollection,
	series: ICharacterCollection,
	stories: ICharacterCollection,
	events: ICharacterCollection,
	urls: {
		type: string,
		url: string
	}[]
}

export interface IMarvelResponse {
	code: number, // The HTTP status code of the returned result
	status: string, // A string description of the call status
	etag: string, // A digest value of the content
	copyright: string, // The copyright notice for the returned result
	attributionText: string, // The attribution notice for this result
	attributionHTML: string, // An HTML representation of the attribution notice for this result
	data: {
		offset: number, // The requested offset(skipped results) of the call
		limit: number, // The requested result limit
		total: number, // The total number of results available
		count: number, // The total number of results returned by this call
		results: ICharacter[] // The list of entities returned by the call
	}
}