# Component Library

## Overview

This library includes a set of React components designed for easy integration and reusability. Current components include Modal, Dropdown, and Drawer, all implemented as composite components.

## Components

### Modal

The `Modal` component is a composite component with the following structure:

- `Modal.Trigger`: To open the modal.
- `Modal.Contents`: The content area of the modal.
- `Modal.Backdrop`: The backdrop for the modal.

#### Usage

```jsx
<Modal>
  <Modal.Trigger>
    {({ openModal, closeModal, isOpen }) => (
      <div onClick={() => openDrawer()}>
        <>{Trigger}</>
      </div>
    )}
  </Modal.Trigger>
  <Modal.Contents>{({ openModal, closeModal, isOpen }) => <div>{/* Contents component */}</div>}</Modal.Contents>
  <Modal.Backdrop>{({ openModal, closeModal, isOpen }) => <div>{/* Backdrop component */}</div>}</Modal.Backdrop>
</Modal>
```

<br>
<br>

### Drawer

The Drawer component includes:

- `Drawer.Trigger`: To open the drawer.
- `Drawer.Contents`: The content area of the drawer.
- `Drawer.Backdrop`: The backdrop for the drawer.

#### Usage

```jsx
<Drawer anchor="right">
  <Drawer.Trigger>
    {({ openDrawer, closeDrawer, isOpen }) => (
      <div onClick={() => openDrawer()}>
        <>{Trigger}</>
      </div>
    )}
  </Drawer.Trigger>
  <Drawer.Contents>{({ openDrawer, closeDrawer, isOpen }) => <div>{/* Contents component */}</div>}</Drawer.Contents>
  <Drawer.Backdrop>{({ openDrawer, closeDrawer, isOpen }) => <div>{/* Backdrop component */}</div>}</Drawer.Backdrop>
</Drawer>
```

<br>
<br>

### Dropdown

The Dropdown component consists of:

- `Dropdown.Trigger`: To display the dropdown.
- `Dropdown.Contents`: The content area of the dropdown.

#### Usage

```jsx
<Dropdown>
  <Dropdown.Trigger>
    {({ isOpen, openDropdown, closeDropdown }) => (
      <p className=" text-xs flex space-x-2 px-3 py-1 -mt-1 -mr-3 justify-end items-center hover:bg-gray-600 cursor-pointer rounded-full">
        <span className="font-bold"> Sort by: {activeItem.title} </span>
        <span>
          <ChevronDownIcon className="h-4 w-4" />
        </span>
      </p>
    )}
  </Dropdown.Trigger>
  <Dropdown.Contents>
    {({ isOpen, openDropdown, closeDropdown }) => (
      <div
        className={classNames(
          'bg-black bg-opacity-90 backdrop-blur-md text-zinc-400 border border-zinc-600 rounded-lg ',
          ' mt-2 -ml-8 p-2 text-sm  absolute  -inset-x-10 right-0 ',
        )}
      >
        <ul className="space-y-2  ">
          {sortKeys.map((item) => (
            <li key={`sort-key-${item.value}`} className="hover:text-zinc-50  ">
              <DropdownItem title={item.title} value={item.value} onClick={() => closeDropdown()} />
            </li>
          ))}
        </ul>
      </div>
    )}
  </Dropdown.Contents>
</Dropdown>
```
