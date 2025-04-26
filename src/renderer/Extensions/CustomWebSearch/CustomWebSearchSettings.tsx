import type { SearchEngineSetting, Settings } from "@common/Extensions/CustomWebSearch";
import { useExtensionSetting } from "@Core/Hooks";
import { SettingGroup } from "@Core/Settings/SettingGroup";
import { SettingGroupList } from "@Core/Settings/SettingGroupList";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableCellActions,
    TableCellLayout,
    TableHeader,
    TableHeaderCell,
    TableRow,
    Tooltip,
} from "@fluentui/react-components";
import { DismissRegular } from "@fluentui/react-icons";
import { useTranslation } from "react-i18next";
import { EditSearchEngine } from "./EditSearchEngine";

export const CustomWebSearchSettings = () => {
    const extensionId = "CustomWebSearch";

    const { t } = useTranslation(`extension[${extensionId}]`);

    const { value: searchEngineSettings, updateValue: setSearchEngineSettings } = useExtensionSetting<
        Settings["searchEngines"]
    >({
        extensionId,
        key: "searchEngines",
    });

    const addSearchEngineSetting = (searchEngineSetting: SearchEngineSetting) =>
        setSearchEngineSettings([...searchEngineSettings, searchEngineSetting]);

    const removeSearchEngineSetting = (id: string) =>
        setSearchEngineSettings(
            searchEngineSettings.filter((searchEngineSetting: SearchEngineSetting) => searchEngineSetting.id !== id),
        );

    const createSetting = (): SearchEngineSetting => ({
        id: crypto.randomUUID(),
        name: "",
        iconUrl: "",
        searchUrl: "",
    });

    return (
        <SettingGroupList>
            <SettingGroup title={t("title")}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell style={{ width: 100 }}>{t("tableHeaderSearchEngineName")}</TableHeaderCell>
                            <TableHeaderCell>{t("tableHeaderSearchUrl")}</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {searchEngineSettings &&
                            searchEngineSettings.map(({ id, name, searchUrl }) => (
                                <TableRow key={id}>
                                    <TableCell>{name}</TableCell>
                                    <TableCell>
                                        <TableCellLayout
                                            style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
                                        >
                                            {searchUrl}
                                        </TableCellLayout>
                                        <TableCellActions>
                                            <Tooltip relationship="label" content={t("remove")}>
                                                <Button
                                                    size="small"
                                                    icon={<DismissRegular />}
                                                    onClick={() => removeSearchEngineSetting(id)}
                                                />
                                            </Tooltip>
                                        </TableCellActions>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <div>
                    <EditSearchEngine
                        onSave={addSearchEngineSetting}
                        initialSearchEngineSetting={{
                            ...createSetting(),
                            isValidName: false,
                            isValidSearchUrl: false,
                        }}
                    />
                </div>
            </SettingGroup>
        </SettingGroupList>
    );
};
