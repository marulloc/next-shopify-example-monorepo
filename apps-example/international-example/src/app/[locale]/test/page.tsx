import Typography from '@/components/_draft/Typography';

const TestPage = () => {
  return (
    <div className="h-screen space-y-10 bg-black p-10">
      {/*  */}

      {/* <Style className=" bg-secondary-muted" /> */}
      <div className="grid grid-cols-3 gap-4">
        <Typography size="xl" color="default" colorWeight="muted" className={'bg-gray-100 font-semibold'}>
          가자가자가자고
        </Typography>
        <Typography size="xl" color="default" colorWeight="base" className={'bg-gray-100 font-semibold'}>
          가자가자가자고
        </Typography>
        <Typography size="xl" color="default" colorWeight="accent" className={'bg-gray-100 font-semibold'}>
          가자가자가자고
        </Typography>

        <Typography size="xl" color="primary" colorWeight="muted" className={'bg-indigo-100 font-semibold'}>
          가자가자가자고
        </Typography>
        <Typography size="xl" color="primary" colorWeight="base" className={'bg-indigo-100 font-semibold'}>
          가자가자가자고
        </Typography>
        <Typography size="xl" color="primary" colorWeight="accent" className={'bg-indigo-100 font-semibold'}>
          가자가자가자고
        </Typography>

        <Typography size="xl" color="secondary" colorWeight="muted" className={'bg-rose-100 font-semibold'}>
          가자가자가자고
        </Typography>
        <Typography size="xl" color="secondary" colorWeight="base" className={'bg-rose-100 font-semibold'}>
          가자가자가자고
        </Typography>
        <Typography size="xl" color="secondary" colorWeight="accent" className={'bg-rose-100 font-semibold'}>
          가자가자가자고
        </Typography>
      </div>

      <div className="grid grid-cols-9 gap-4">
        <Typography size="lg" color="default" colorWeight="muted" className={'bg-gray-100'}>
          가자가자가자고
        </Typography>
        <Typography size="lg" color="default" colorWeight="base" className={'bg-gray-100'}>
          가자가자가자고
        </Typography>
        <Typography size="lg" color="default" colorWeight="accent" className={'bg-gray-100'}>
          가자가자가자고
        </Typography>

        <Typography size="lg" color="primary" colorWeight="muted" className={'bg-indigo-100'}>
          가자가자가자고
        </Typography>
        <Typography size="lg" color="primary" colorWeight="base" className={'bg-indigo-100'}>
          가자가자가자고
        </Typography>
        <Typography size="lg" color="primary" colorWeight="accent" className={'bg-indigo-100'}>
          가자가자가자고
        </Typography>

        <Typography size="lg" color="secondary" colorWeight="muted" className={'bg-rose-100'}>
          가자가자가자고
        </Typography>
        <Typography size="lg" color="secondary" colorWeight="base" className={'bg-rose-100'}>
          가자가자가자고
        </Typography>
        <Typography size="lg" color="secondary" colorWeight="accent" className={'bg-rose-100'}>
          가자가자가자고
        </Typography>
      </div>

      <div className="grid grid-cols-9 gap-4">
        <Typography size="md" color="default" colorWeight="muted" className={'bg-gray-100'}>
          가자가자가자고
        </Typography>
        <Typography size="md" color="default" colorWeight="base" className={'bg-gray-100'}>
          가자가자가자고
        </Typography>
        <Typography size="md" color="default" colorWeight="accent" className={'bg-gray-100'}>
          가자가자가자고
        </Typography>

        <Typography size="md" color="primary" colorWeight="muted" className={'bg-indigo-100'}>
          가자가자가자고
        </Typography>
        <Typography size="md" color="primary" colorWeight="base" className={'bg-indigo-100'}>
          가자가자가자고
        </Typography>
        <Typography size="md" color="primary" colorWeight="accent" className={'bg-indigo-100'}>
          가자가자가자고
        </Typography>

        <Typography size="md" color="secondary" colorWeight="muted" className={'bg-rose-100'}>
          가자가자가자고
        </Typography>
        <Typography size="md" color="secondary" colorWeight="base" className={'bg-rose-100'}>
          가자가자가자고
        </Typography>
        <Typography size="md" color="secondary" colorWeight="accent" className={'bg-rose-100'}>
          가자가자가자고
        </Typography>
      </div>

      <Typography size="4xl" />
      <Typography size="3xl" />
      <Typography size="2xl" />
      <Typography size="xl" />
      <Typography size="lg" />
      <Typography size="md" />
      <Typography size="sm" />
      <Typography size="xs" />
    </div>
  );
};

export default TestPage;
