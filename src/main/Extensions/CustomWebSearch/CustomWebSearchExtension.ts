import type { AssetPathResolver } from "@Core/AssetPathResolver";
import type { Extension } from "@Core/Extension";
import type { SettingsManager } from "@Core/SettingsManager";
import { createOpenUrlSearchResultAction, type SearchResultItem } from "@common/Core";
import { getExtensionSettingKey } from "@common/Core/Extension";
import type { Image } from "@common/Core/Image";
import type { Settings } from "@common/Extensions/CustomWebSearch";

export class CustomWebSearchExtension implements Extension {
    public readonly id = "CustomWebSearch";
    public readonly name = "Custom Web Search";

    public readonly nameTranslation = {
        key: "extensionName",
        namespace: "extension[CustomWebSearch]",
    };

    public readonly author = {
        name: "Taka Kuroki",
        githubUserName: "taku330",
    };

    public constructor(
        private readonly assetPathResolver: AssetPathResolver,
        private readonly settingsManager: SettingsManager,
    ) {}

    public async getSearchResultItems(): Promise<SearchResultItem[]> {
        return [];
    }

    public isSupported(): boolean {
        return true;
    }

    public getSettingDefaultValue<T>(key: string): T {
        return this.getDefaultSettings()[key] as T;
    }

    public getImage(): Image {
        return {
            url: `file://${this.assetPathResolver.getExtensionAssetPath(this.id, "websearch.png")}`,
        };
    }

    public getI18nResources() {
        return {
            "en-US": {
                extensionName: "Custom Web Search",
                title: "Custom Web Search",
                tableHeaderSearchEngineName: "Name",
                tableHeaderSearchUrl: "Search Url",
                tableHeaderIconUrl: "Icon Url",
                showInstantSearchResult: "Show instant search result",
                addCustomSearchEngine: "Add Custom Search",
                dialogNameTitle: "Name",
                dialogSearchUrlTitle: "Search Url (e.g. https://www.google.com/search?q={query})",
                dialogIconUrlTitle: "Icon Url (If not set, default icon will be used)",
                dialogValidField: "Valid",
                dialogInvalidField: "Field cannot be empty",
                dialogAdd: "Add",
                dialogCancel: "Cancel",
            },
        };
    }

    public getInstantSearchResultItems(searchTerm: string): SearchResultItem[] {
        const searchEngineSettings = this.settingsManager.getValue(
            getExtensionSettingKey(this.id, "searchEngines"),
            this.getDefaultSettings().searchEngines,
        );

        return searchEngineSettings.map((searchEngine) => {
            const searchUrl = `${searchEngine.searchUrl.replace("{query}", searchTerm)}`;
            const iconUrl =
                searchEngine.iconUrl ??
                `file://${this.assetPathResolver.getExtensionAssetPath(this.id, "websearch.png")}`;

            return {
                id: `customWebSearch:${searchEngine.name}`,
                defaultAction: createOpenUrlSearchResultAction({
                    url: searchUrl,
                }),
                description: "Custom Web Search",
                name: `Search ${searchEngine.name} for ${searchTerm}`,
                image: { url: iconUrl },
            };
        });
    }

    private getDefaultSettings(): Settings {
        return {
            searchEngines: [],
        };
    }

    public getSettingKeysTriggeringRescan(): string[] {
        return ["general.language", getExtensionSettingKey(this.id, "searchEngines")];
    }
}
