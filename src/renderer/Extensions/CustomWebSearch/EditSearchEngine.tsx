import type { SearchEngineSetting } from "@common/Extensions/CustomWebSearch";
import {
    Button,
    Dialog,
    DialogActions,
    DialogBody,
    DialogContent,
    DialogSurface,
    DialogTitle,
    DialogTrigger,
    Field,
    Input,
} from "@fluentui/react-components";
import { AddRegular } from "@fluentui/react-icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type TemporarySearchEngineSetting = SearchEngineSetting & { isValidName: boolean; isValidSearchUrl: boolean };

type EditSearchEngineProps = {
    onSave: (searchEngineSetting: SearchEngineSetting) => void;
    initialSearchEngineSetting: TemporarySearchEngineSetting;
};

const mapTemporarySearchEngineSettingToSearchEngineSetting = ({
    id,
    name,
    iconUrl,
    searchUrl,
}: TemporarySearchEngineSetting): SearchEngineSetting => ({
    id,
    name,
    iconUrl,
    searchUrl,
});

export const EditSearchEngine = ({ initialSearchEngineSetting, onSave }: EditSearchEngineProps) => {
    const extensionId = "CustomWebSearch";

    const { t } = useTranslation(`extension[${extensionId}]`);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [temporarySearchEngineSetting, setTemporarySearchEngineSetting] =
        useState<TemporarySearchEngineSetting>(initialSearchEngineSetting);

    const openDialog = () => setIsDialogOpen(true);

    const closeDialog = () => {
        setTemporarySearchEngineSetting(initialSearchEngineSetting);
        setIsDialogOpen(false);
    };

    const setName = (name: string) => {
        setTemporarySearchEngineSetting({ ...temporarySearchEngineSetting, name, isValidName: name !== "" });
    };

    const setSearchUrl = (searchUrl: string) => {
        setTemporarySearchEngineSetting({
            ...temporarySearchEngineSetting,
            searchUrl,
            isValidSearchUrl: searchUrl !== "",
        });
    };

    const setIconUrl = (iconUrl: string) => {
        setTemporarySearchEngineSetting({
            ...temporarySearchEngineSetting,
            iconUrl
        });
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={(_, { open }) => (open ? openDialog() : closeDialog())}>
            <DialogTrigger disableButtonEnhancement>
                <Button onClick={openDialog} icon={<AddRegular />}>
                    {t("addCustomSearchEngine")}
                </Button>
            </DialogTrigger>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>{t("addCustomSearchEngine")}</DialogTitle>
                    <DialogContent>
                        <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: 10 }}>
                            <Field
                                label={t("dialogNameTitle")}
                                validationMessage={
                                    temporarySearchEngineSetting.isValidName
                                        ? t("dialogValidField")
                                        : t("dialogInvalidField")
                                }
                                validationState={temporarySearchEngineSetting.isValidName ? "success" : "error"}
                            >
                                <Input
                                    value={temporarySearchEngineSetting.name}
                                    onChange={(_, { value }) => setName(value)}
                                />
                            </Field>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: 10 }}>
                            <Field
                                label={t("dialogSearchUrlTitle")}
                                validationMessage={
                                    temporarySearchEngineSetting.isValidSearchUrl
                                        ? t("dialogValidField")
                                        : t("dialogInvalidField")
                                }
                                validationState={temporarySearchEngineSetting.isValidSearchUrl ? "success" : "error"}
                            >
                                <Input
                                    value={temporarySearchEngineSetting.searchUrl}
                                    onChange={(_, { value }) => setSearchUrl(value)}
                                />
                            </Field>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: 10 }}>
                            <Field
                                label={t("dialogIconUrlTitle")}
                            >
                                <Input
                                    value={temporarySearchEngineSetting.iconUrl}
                                    onChange={(_, { value }) => setIconUrl(value)}
                                />
                            </Field>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="secondary" onClick={closeDialog}>
                                {t("dialogCancel")}
                            </Button>
                        </DialogTrigger>
                        <Button
                            disabled={false}
                            onClick={() => {
                                closeDialog();
                                onSave(
                                    mapTemporarySearchEngineSettingToSearchEngineSetting(temporarySearchEngineSetting),
                                );
                            }}
                            appearance="primary"
                        >
                            {t("dialogAdd")}
                        </Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};
