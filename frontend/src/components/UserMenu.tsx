import { useState } from "react";
import cx from "clsx";
import { Avatar, Menu, Text, UnstyledButton, Group } from "@mantine/core";
import { IconChevronDown, IconLogout, IconSettings, IconUser } from "@tabler/icons-react";
import classes from "./UserMenu.module.css";

// TODO: Sample data
const user = {
  name: "First Last",
  email: "firstlast@dispatch.dev",
};

export default function UserMenu() {
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
          <Group gap={7}>
            <Avatar color="initials" alt={user.name} name={user.name} radius="xl" size={30} />
            <Text fw={500} size="sm" lh={1} mr={3}>
              {user.name}
            </Text>
            <IconChevronDown size={12} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        {/* TODO: Add proper functionality to menu items */}
        <Menu.Item leftSection={<IconUser size={16} stroke={1.5} />}>Your profile</Menu.Item>{" "}
        <Menu.Item leftSection={<IconSettings size={16} stroke={1.5} />}>Settings</Menu.Item>
        <Menu.Item leftSection={<IconLogout size={16} stroke={1.5} />}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
