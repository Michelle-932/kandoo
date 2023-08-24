import {Fragment, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
// import {ToastContainer, toast} from 'react-toastify';
import {BsPlus, BsXLg} from 'react-icons/bs';
import dataService from '../services/dataService';
import {MdDelete, MdModeEdit, MdFileCopy} from 'react-icons/md';
import formatDate from '../utils/formatDate';
import {useModalContext} from '../contexts/ModalContext/ModalContext';

const WorkspaceSlideOver = ({
    taskId,
    taskName,
    taskDetail,
    taskComments,
    tags,
    assignedUserIds,
    columnName,
    createdAt,
    boardId,
    columnId,
}) => {
    const {isSlideOverOpen, setIsSlideOverOpen} = useModalContext();
    const [editingMode, setEditingMode] = useState(false);
    // const [editedTaskName, setEditedTaskName] = useState(taskName);
    // const [editedTaskDetail, setEditedTaskDetail] = useState(taskDetail);
    // const [editedTags, setEditedTags] = useState(tags);

    const [formData, setFormData] = useState(
        {
            taskName: taskName, 
            taskDetail: taskDetail, 
            tags: tags, 
        }
    )
    console.log(formData.taskName)

    // const [isDirty, setIsDirty] = useState(false);

    const toggleEditingMode = () => {
        setEditingMode(!editingMode);
    };

    // const handleChange = (field, value) => {
    //     setIsDirty(true); // Mark changes
    //     switch (field) {
    //         case 'taskName':
    //             setEditedTaskName(value);
    //             break;
    //         case 'taskDetail':
    //             setEditedTaskDetail(value);
    //             break;
    //         case 'tags':
    //             setEditedTags(value);
    //             break;
    //         default:
    //             break;
    //     }
    // };

    // const handleTaskSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         const updatedData = {
    //             taskName: editedTaskName,
    //             taskDetail: editedTaskDetail,
    //             tags: editedTags,
    //         };
    //         const response = await dataService.updateTask(
    //             boardId,
    //             columnId,
    //             taskId,
    //             updatedData
    //         );
    //         if (response){
    //             setEditedTaskName(response.data.taskName);
    //             setEditedTaskDetail(response.data.taskDetail);
    //             setEditedTags(response.data.tags);
    //             console.log('Beep boop your task has been updated!');
    //         }

    //         setIsDirty(false); // Reset changes after update
    //         toggleEditingMode();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    async function handleTaskSubmit(event) {
            event.preventDefault()
            try {
              const response = await dataService.updateTask(
                            boardId,
                            columnId,
                            taskId,
                            formData
                        );
              console.log(response)
            //   setIsDirty(false);
              toggleEditingMode()
      
            } catch (error) {
              console.error(error)
            }
          }

    function handleChange(event) {
        // setIsDirty(true);
        console.log(event)
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => ({
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }))
    }


    return (
        <Transition.Root show={isSlideOverOpen} as={Fragment}>
            <Dialog
                as='div'
                className='relative z-10'
                onClose={() => setIsSlideOverOpen(false)}
            >
                <div className='fixed inset-0' />

                <div className='fixed inset-0 overflow-hidden'>
                    <div className='absolute inset-0 overflow-hidden'>
                        <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16'>
                            <Transition.Child
                                as={Fragment}
                                enter='transform transition ease-in-out duration-500 sm:duration-700'
                                enterFrom='translate-x-full'
                                enterTo='translate-x-0'
                                leave='transform transition ease-in-out duration-500 sm:duration-700'
                                leaveFrom='translate-x-0'
                                leaveTo='translate-x-full'
                            >
                                <Dialog.Panel className='pointer-events-auto w-screen max-w-2xl'>
                                    <form
                                        className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'
                                        onSubmit={handleTaskSubmit}
                                    >
                                        <div className='flex-1'>
                                            {/* Header */}
                                            <div className='bg-gray-50 px-4 py-6 sm:px-6'>
                                                <div className='flex items-start justify-between space-x-3'>
                                                    <div className='space-y-1'>
                                                        <Dialog.Title className='text-2xl font-semibold leading-6 text-gray-900'>
                                                            {editingMode ? (
                                                                <input
                                                                    type='text'
                                                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tertiaryLight sm:text-sm sm:leading-6'
                                                                    name="taskName"
                                                                    value={
                                                                        formData.taskName
                                                                    }
                                                                    onChange={handleChange}
                                                                />
                                                            ) : (
                                                                <div className='text-2xl font-semibold leading-6 text-gray-900'>
                                                                    {
                                                                        formData.taskName
                                                                    }
                                                                    {tags}
                                                                </div>
                                                            )}
                                                        </Dialog.Title>
                                                        <div className='flex'>
                                                            <p className='text-sm text-gray-500'>
                                                                in list&nbsp;
                                                            </p>
                                                            <p className='text-tertiaryLight'>
                                                                {columnName}
                                                            </p>
                                                            </div>
                                                            <p className='text-sm text-gray-500 '>
                                                                Created:{' '}
                                                                {formatDate(
                                                                    createdAt
                                                                )}
                                                            </p>
                                                        
                                                    </div>
                                                    <div className='flex h-7 gap-2 items-center'>
                                                        <button
                                                            type='button'
                                                            className='relative text-gray-400 hover:text-gray-500'
                                                            onClick={
                                                                toggleEditingMode
                                                            }
                                                        >
                                                            <span className='absolute -inset-2.5' />
                                                            <span className='sr-only'>
                                                                Edit panel
                                                            </span>
                                                            <MdModeEdit
                                                                className='h-5 w-5'
                                                                aria-hidden='true'
                                                            />
                                                        </button>
                                                        <button
                                                            type='button'
                                                            className='relative text-gray-400 hover:text-gray-500'
                                                            onClick={() =>
                                                                setIsSlideOverOpen(
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            <span className='absolute -inset-2.5' />
                                                            <span className='sr-only'>
                                                                Close panel
                                                            </span>
                                                            <BsXLg
                                                                className='h-6 w-6'
                                                                aria-hidden='true'
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Divider container */}
                                            <div className='space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0'>
                                                {/* Assignees */}
                                                <div className='space-y-2 px-4 flex sm:items-center sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5'>
                                                    <div>
                                                        <h3 className='text-sm font-medium leading-6 text-gray-900'>
                                                            Assignees
                                                        </h3>
                                                    </div>
                                                    <div className='sm:col-span-2 text-sm font-medium leading-6 text-gray-900 '>
                                                        <div className='flex space-x-2'>
                                                            {assignedUserIds &&
                                                                assignedUserIds.map(
                                                                    (
                                                                        person
                                                                    ) => (
                                                                        <a
                                                                            key={
                                                                                person.email
                                                                            }
                                                                            href={
                                                                                person.href
                                                                            }
                                                                            className='flex-shrink-0 rounded-full hover:opacity-75'
                                                                        >
                                                                            <img
                                                                                className='inline-block h-8 w-8 rounded-full'
                                                                                src={
                                                                                    person.imageUrl
                                                                                }
                                                                                alt={
                                                                                    person.name
                                                                                }
                                                                            />
                                                                        </a>
                                                                    )
                                                                )}

                                                            <button
                                                                type='button'
                                                                className='relative inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-infoLight focus:ring-offset-2'
                                                            >
                                                                <span className='absolute -inset-2' />
                                                                <span className='sr-only'>
                                                                    Add team
                                                                    member
                                                                </span>
                                                                <BsPlus
                                                                    className='h-5 w-5'
                                                                    aria-hidden='true'
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Project description */}
                                                <div className='space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5'>
                                                    <div>
                                                        <label
                                                            htmlFor='project-description'
                                                            className='block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5'
                                                        >
                                                            Description
                                                        </label>
                                                    </div>
                                                    <div className='sm:col-span-3'>
                                                        {editingMode ? (
                                                            <textarea
                                                                type='text'
                                                                rows={3}
                                                                value={
                                                                    formData.taskDetail
                                                                }
                                                                name='taskDetail'
                                                                onChange={handleChange}
                                                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tertiaryLight sm:text-sm sm:leading-6'
                                                            />
                                                        ) : (
                                                            <p className='text-sm text-gray-500'>
                                                                {formData.taskDetail}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Tags */}
                                                <fieldset className='space-y-2 px-4 sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5'>
                                                    <legend className='sr-only'>
                                                        Tags
                                                    </legend>
                                                    <div
                                                        className='text-sm font-medium leading-6 text-gray-900'
                                                        aria-hidden='true'
                                                    >
                                                        Tags
                                                    </div>
                                                    <div className='space-y-5 sm:col-span-2'>
                                                        <div className='space-y-5 sm:mt-0 '>
                                                            <div className='relative items-start sm:col-span-3'>
                                                                <div className='absolute flex h-6 items-center'>
                                                                    <input
                                                                        id='public-access'
                                                                        name='privacy'
                                                                        aria-describedby='public-access-description'
                                                                        type='radio'
                                                                        className='h-4 w-4 border-gray-300 text-tertiaryLight focus:ring-tertiaryLight'
                                                                        defaultChecked
                                                                    />
                                                                </div>
                                                                <div className='pl-7 text-sm leading-6'>
                                                                    <label
                                                                        htmlFor='public-access'
                                                                        className='font-medium text-gray-900'
                                                                    >
                                                                        <span className='inline-block mr-1 last:mr-0 py-1 px-2 rounded-full bg-red-200 text-xs font-semibold text-red-600 uppercase'>
                                                                            High
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className='relative flex items-start'>
                                                                <div className='absolute flex h-6 items-center'>
                                                                    <input
                                                                        id='restricted-access'
                                                                        name='privacy'
                                                                        aria-describedby='restricted-access-description'
                                                                        type='radio'
                                                                        className='h-4 w-4 border-gray-300 text-tertiaryLight focus:ring-tertiaryLight'
                                                                    />
                                                                </div>
                                                                <div className='pl-7 text-sm leading-6'>
                                                                    <label
                                                                        htmlFor='restricted-access'
                                                                        className='font-medium text-gray-900'
                                                                    >
                                                                        <span className='inline-block mr-1 last:mr-0 py-1 px-2 rounded-full bg-yellow-200 text-xs font-semibold text-yellow-600 uppercase'>
                                                                            Medium
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className='relative flex items-start'>
                                                                <div className='absolute flex h-6 items-center'>
                                                                    <input
                                                                        id='private-access'
                                                                        name='privacy'
                                                                        aria-describedby='private-access-description'
                                                                        type='radio'
                                                                        className='h-4 w-4 border-gray-300 text-tertiaryLight focus:ring-tertiaryLight'
                                                                    />
                                                                </div>
                                                                <div className='pl-7 text-sm leading-6'>
                                                                    <label
                                                                        htmlFor='private-access'
                                                                        className='font-medium text-gray-900'
                                                                    >
                                                                        <span className='inline-block mr-1 last:mr-0 py-1 px-2 rounded-full bg-blue-200 text-xs font-semibold text-blue-600 uppercase'>
                                                                            Low
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Saving for Post MVP */}

                                                        {/* <hr className='border-gray-200' /> 
                                                        <div className='flex flex-col items-start space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
                                                            <div>
                                                                <a
                                                                    href='#'
                                                                    className='group flex items-center space-x-2.5 text-sm font-medium text-tertiaryLight hover:text-secondaryLight'
                                                                >
                                                                    <BsLink45Deg
                                                                        className='h-5 w-5 text-infoLight group-hover:text-secondaryLight'
                                                                        aria-hidden='true'
                                                                    />
                                                                    <span>
                                                                        Copy
                                                                        link
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div>
                                                                <a
                                                                    href='#'
                                                                    className='group flex items-center space-x-2.5 text-sm text-gray-500 hover:text-gray-900'
                                                                >
                                                                    <BsFillQuestionCircleFill
                                                                        className='h-5 w-5 text-gray-400 group-hover:text-gray-500'
                                                                        aria-hidden='true'
                                                                    />
                                                                    <span>
                                                                        Learn
                                                                        more
                                                                        about
                                                                        sharing
                                                                    </span>
                                                                </a>
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                </fieldset>
                                                {/* Comments */}
                                                <div className='space-y-2 px-4  sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5'>
                                                    <div>
                                                        <label
                                                            htmlFor='project-comments'
                                                            className='block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5'
                                                        >
                                                            Comments{' '}
                                                            {taskComments.length >
                                                            0
                                                                ? taskComments
                                                                : '0'}
                                                        </label>
                                                    </div>
                                                    <p className='text-sm italic text-gray-500 space-y-2 px-4  sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5'>
                                                        {taskComments.length > 0
                                                            ? taskComments
                                                            : // {taskComment.map((comment) => (
                                                              //     <Comment
                                                              //         comment = {taskComments}
                                                              //     />
                                                              //   ))}
                                                              'No comments yet'}
                                                    </p>
                                                    <textarea
                                                        id='project-description'
                                                        name='project-description'
                                                        rows={3}
                                                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tertiaryLight sm:text-sm sm:leading-6'
                                                        defaultValue='Write your comment here'
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action buttons */}
                                        {editingMode && (
                                            <div className='flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6'>
                                                <div className='flex justify-end space-x-3'>
                                                    <button
                                                        type='button'
                                                        className='rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                                                        onClick={() => {
                                                            setIsDirty(false); // Reset changes
                                                            setEditingMode(
                                                                false
                                                            );
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type='button'
                                                        className='inline-flex justify-center rounded-md bg-tertiaryLight px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-infoLight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiaryLight'
                                                        onClick={
                                                            handleTaskSubmit
                                                        }
                                                    >
                                                        Update
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default WorkspaceSlideOver;