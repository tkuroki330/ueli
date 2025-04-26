import type { Dependencies } from "@Core/Dependencies";
import type { DependencyRegistry } from "@Core/DependencyRegistry";
import type { ExtensionBootstrapResult } from "../ExtensionBootstrapResult";
import type { ExtensionModule } from "../ExtensionModule";
import { CustomWebSearchExtension } from "./CustomWebSearchExtension";

export class CustomWebSearchExtensionModule implements ExtensionModule {
    public bootstrap(dependencyRegistry: DependencyRegistry<Dependencies>): ExtensionBootstrapResult {
        const assetPathResolver = dependencyRegistry.get("AssetPathResolver");
        const settingsManager = dependencyRegistry.get("SettingsManager");

        return {
            extension: new CustomWebSearchExtension(assetPathResolver, settingsManager),
        };
    }
}
